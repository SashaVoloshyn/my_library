import { NextFunction, Request, Response } from 'express';

import { IRequest, IResponse, IUser } from '../interfaces';
import { Users } from '../entities';
import { authService } from '../services/auth.service';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';

class AuthController {
    public async registration(req: IRequest, res: IResponse<Users>, next: NextFunction)
        : Promise<IResponse<Users> | undefined> {
        try {
            const {
                nickName, role, email, password,
            } = req.user as IUser;
            console.log(req);
            console.log(req.user);
            console.log(req.body);

            console.log(nickName);

            const userDB = await authService.regii({
                nickName, role, email, password,
            });
            console.log(userDB);

            if (!userDB) {
                next(new ErrorHandler(
                    'errorMessageConstant.userNotRegistration',
                    HttpStatusEnum.NOT_IMPLEMENTED,
                    HttpMessageEnum.NOT_IMPLEMENTED,
                ));
                return;
            }

            res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: userDB,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async regtest(req:Request, res:Response, next:NextFunction): Promise<any> {
        try {
            const test = req.body;
            console.log(req.body);
            const save = await authService.registration(test);
            res.json(save);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
