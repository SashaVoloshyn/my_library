import { NextFunction } from 'express';

import {
    IRequest, IResponse, ITokenPair, IUser,
} from '../interfaces';
import { Users } from '../entities';
import { authService } from '../services/auth.service';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { errorMessageConstants } from '../constants';
import { clientService } from '../services';
import { ClientEnum } from '../enums/client.enum';

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
            console.log(userDB);

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

            const clientKey = clientService.generateClientKey(nickName, ClientEnum.AUTHTOKEN) as string;

            const tokensPairGenerat = await authService.login({ id, role, nickName }, clientKey);

            if (!tokensPairGenerat) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }
            const { accessToken, refreshToken } = tokensPairGenerat;
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


}

export const authController = new AuthController();
