import { NextFunction } from 'express';

import {
    IForgotToken,
    IPayload,
    IRequest, IResponse, ITokenPair, IUser,
} from '../interfaces';
import { Users } from '../entities';
import { authService } from '../services/auth.service';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum, MessagesEnum } from '../enums';
import { emailMessagesConstant, errorMessageConstants } from '../constants';
import { userService } from '../services';

class AuthController {
    public async registration(req: IRequest, res: IResponse<Users>, next: NextFunction)
        : Promise<IResponse<Users> | undefined> {
        try {
            const {
                nickName, role, email, password,
            } = req.body as IUser;

            const userDB = await authService.registration({
                nickName, role, email, password,
            });

            if (!userDB) {
                next(new ErrorHandler(
                    errorMessageConstants.userNotRegistration,
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async login(req:IRequest, res:IResponse<ITokenPair>, next:NextFunction)
    : Promise<IResponse<ITokenPair> | undefined> {
        try {
            const { nickName, role, id } = req.user as Users;

            const tokensPairGenerat = await authService.login({ id, role, nickName });

            if (!tokensPairGenerat) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }
            const { accessToken, refreshToken, clientKey } = tokensPairGenerat;
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    accessToken,
                    refreshToken,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequest, res: IResponse<number>, next: NextFunction): Promise<IResponse<number> | undefined> {
        try {
            const clientKey = req.clientKey as string;
            const deletedTokens = await authService.logout(clientKey);

            if (!deletedTokens) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: deletedTokens,
            });
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequest, res: IResponse<ITokenPair>, next: NextFunction): Promise<IResponse<ITokenPair> | undefined> {
        try {
            const reqClientKey = req.clientKey as string;
            const payload = req.payload as IPayload;
            const newTokens = await authService.refresh(payload, reqClientKey);
            if (!newTokens) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { refreshToken, accessToken, clientKey } = newTokens;

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: {
                    refreshToken,
                    accessToken,
                    clientKey,
                },
            });
        } catch (e) {
            next(e);
        }
    }

    public async forgotPassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const { nickName, id, role } = req.user as Users;

            const forgotGeneratedAndSaved = await authService.forgotPassword({ id, nickName, role });

            if (!forgotGeneratedAndSaved) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            const { forgotToken, clientKey } = forgotGeneratedAndSaved as IForgotToken;

            console.log(forgotToken, clientKey);

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                message: HttpMessageEnum.OK,
                data: emailMessagesConstant[MessagesEnum.AFTER_SENT_MESSAGE_ON_EMAIL],
            });
        } catch (e) {
            next(e);
        }
    }

    public async changePassword(req: IRequest, res: IResponse<string>, next: NextFunction): Promise<IResponse<string> | undefined> {
        try {
            const password = req.password as string;
            const payload = req.payload as IPayload;
            const id = payload as number;

            const changePassword = await userService.changePassword(id, password);
            console.log(changePassword,'chensdflfsd;')

            if (!changePassword) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK)
                .json({
                    status: HttpStatusEnum.OK,
                    message: HttpMessageEnum.OK,
                    data: emailMessagesConstant[MessagesEnum.CHANGE_PASSWORD],
                });
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
