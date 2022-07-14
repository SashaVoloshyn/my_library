import { NextFunction, Response } from 'express';

import {
    IPayload, IRequest, IResponse, ITokenPair, IUser,
} from '../interfaces';
import {
    clientKeySchema, emailSchema, loginSchema, passwordSchema, tokenSchema, userSchema,
} from '../utils';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';
import { userRepository } from '../repositories';
import { constants, errorMessageConstants } from '../constants';
import {
    bcryptService, clientService, jwtService, userService,
} from '../services';
import { Users } from '../entities';
import { ClientEnum } from '../enums/client.enum';

class AuthMiddleware {
    public loginBodyValidate(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { value, error } = loginSchema.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
            }

            req.authorizatePassword = value.password;
            req.email = value.email;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserExistByEmail(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const email = req.email as string;
            const user = await userRepository.getOneByEmail(email);
            if (!user) {
                next(new ErrorHandler(errorMessageConstants.userNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }
            req.user = user as IUser;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserPassword(req: IRequest, _: Response, next: NextFunction) :Promise<void> {
        try {
            const password = req.authorizatePassword as string;
            const { password: passwordFromDB } = req.user as Users;

            const resultAfterChecked = await bcryptService.compare(password, passwordFromDB);

            if (!resultAfterChecked) {
                next(new ErrorHandler(errorMessageConstants.unauthorized, HttpStatusEnum.UNAUTHORIZED, HttpMessageEnum.UNAUTHORIZED));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public registrationBodyValidate(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { value, error } = userSchema.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserIsUniq(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email, nickName } = req.user as IUser;
            const user = await userRepository.getOneByEmailOrNickName({ nickName, email });

            if (user) {
                next(new ErrorHandler(errorMessageConstants.userAlreadyExists, HttpStatusEnum.CONFLICT, HttpMessageEnum.CONFLICT));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async authorization(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.get(constants.AUTHORIZATION) as string;

            if (!authorization) {
                next(new ErrorHandler(
                    errorMessageConstants.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.authorization = authorization;
            next();
        } catch (e) {
            next(e);
        }
    }

    public isClientKey(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { error } = clientKeySchema.validate(body);

            if (error) {
                next(
                    new ErrorHandler(
                        error.message,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ),
                );
                return;
            }

            const { clientKey } = body;
            req.clientKey = clientKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAuthorizationOnBearer(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const authorization = req.authorization as string;
            const bearer = authorization.split(' ')[0];

            if (bearer !== constants.BEARER) {
                next(new ErrorHandler(
                    errorMessageConstants.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateAuthorizationToken(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const authorization = req.authorization as string;
            const token = authorization.split(' ')[1];

            if (!token) {
                next(new ErrorHandler(
                    errorMessageConstants.authorization,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            const { error } = tokenSchema.validate({ token });

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                next();
                return;
            }

            req.authorization = token;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyAccessToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName } = jwtService.verify(token) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstants.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyRefreshToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, constants.REFRESH) as IPayload;

            if (!nickName || !role || !id) {
                next(
                    new ErrorHandler(
                        errorMessageConstants.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async verifyForgotToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const token = req.authorization as string;
            const { nickName, role, id } = jwtService.verify(token, constants.FORGOT) as IPayload;

            if (!nickName) {
                next(
                    new ErrorHandler(
                        errorMessageConstants.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            req.payload = { nickName, role, id };
            next();
        } catch (e) {
            next(e);
        }
    }

    public async wasItIssuedToken(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const key = req.clientKey as string;

            const keyFromDB = await clientService.getKey(key);

            if (!keyFromDB) {
                next(
                    new ErrorHandler(
                        errorMessageConstants.unauthorized,
                        HttpStatusEnum.UNAUTHORIZED,
                        HttpMessageEnum.UNAUTHORIZED,
                    ),
                );
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserAuthByPayload(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const { nickName: nickNamePayload } = req.payload as IPayload;
            const nickName = nickNamePayload as string;
            const user = await userService.getOneByEmailOrNickName({ nickName });

            if (!user) {
                next(new ErrorHandler(errorMessageConstants.userNotFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validateEmail(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = emailSchema.validate(body);

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.email = value.email;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async alreadyExistsForgotToken(req: IRequest, _: IResponse<ITokenPair>, next: NextFunction): Promise<void> {
        try {
            const { nickName } = req.user as Users;

            const anyKeysByNickName = await clientService.getAnyKeysByNickName(nickName, ClientEnum.FORGOTTOKEN);

            if (anyKeysByNickName.length) {
                const deleted = await clientService.delete(anyKeysByNickName[0]);

                if (!deleted) {
                    next(new ErrorHandler(
                        errorMessageConstants.unknown,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    // public isPassword(req: IRequest, _: IResponse<ITokenPair>, next: NextFunction): void {
    //     try {
    //         const body = req.body as string;
    //         const { value, error } = passwordSchema.validate(body);
    //
    //         if (error) {
    //             next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
    //             return;
    //         }
    //
    //         req.password = value;
    //         next();
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    public isPassword(req: IRequest, _: IResponse<ITokenPair>, next: NextFunction): void {
        try {
            const { body } = req;
            const { value, error } = passwordSchema.validate({ password: body?.password });

            if (error) {
                next(new ErrorHandler(error.message, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST));
                return;
            }

            req.body = { clientKey: body?.clientKey };
            req.password = value.password;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAuthClientKey(req: IRequest, _: IResponse<ITokenPair>, next: NextFunction): Promise<void> {
        try {
            const clientKey = req.clientKey as string;
            const forgotToken = await clientService.getKey(clientKey);

            if (!forgotToken.length) {
                next(new ErrorHandler(
                    errorMessageConstants.unauthorized,
                    HttpStatusEnum.UNAUTHORIZED,
                    HttpMessageEnum.UNAUTHORIZED,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
