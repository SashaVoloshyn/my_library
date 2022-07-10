import { NextFunction, Response } from 'express';

import { IRequest, IUser } from '../interfaces';
import { loginSchema } from '../utils';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';
import { userRepository } from '../repositories';
import { errorMessageConstants } from '../constants';
import { bcryptService } from '../services';
import { Users } from '../entities';

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
}

export const authMiddleware = new AuthMiddleware();
