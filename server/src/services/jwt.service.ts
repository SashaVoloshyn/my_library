import jwt, { JwtPayload } from 'jsonwebtoken';

import { mainConfig } from '../configs';
import { IPayload, ITokenPair } from '../interfaces';
import { constants } from '../constants';
import { clientService } from './client.service';

class JwtService {
    public async generateTokenPair(payload:IPayload, clientKey:string)
        : Promise<ITokenPair | undefined> {
        const accessToken = jwt.sign(
            payload,
            mainConfig.SECRET_ACCESS_KEY as string,
            { expiresIn: mainConfig.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            mainConfig.SECRET_REFRESH_KEY as string,
            { expiresIn: mainConfig.EXPIRES_IN_REFRESH },
        );

        const saveToken = await clientService.set(
            clientKey,
            JSON.stringify({ accessToken, refreshToken }),
        );

        if (!saveToken) {
            return;
        }
        return {
            accessToken,
            refreshToken,
            clientKey,
        };
    }

    // public sign(payload: any, type = 'access'): string {
    //     let secretWord = mainConfig.SECRET_ACCESS_KEY;
    //     let expiresIn = mainConfig.EXPIRES_IN_ACCESS;
    //
    //     if (type === 'refresh') {
    //         secretWord = mainConfig.SECRET_REFRESH_KEY;
    //         expiresIn = mainConfig.EXPIRES_IN_REFRESH;
    //     }
    //
    //     if (type === 'forgot') {
    //         secretWord = mainConfig.SECRET_FORGOT_PASSWORD_KEY;
    //         expiresIn = mainConfig.EXPIRES_IN_FORGOT_PASSWORD;
    //     }
    //
    //     return jwt.sign(payload, secretWord, { expiresIn });
    // }

    public verify(token: string, type = constants.ACCESS): string | JwtPayload {
        let secretWord = mainConfig.SECRET_ACCESS_KEY;

        if (type === constants.REFRESH) {
            secretWord = mainConfig.SECRET_REFRESH_KEY;
        }

        if (type === constants.FORGOT) {
            secretWord = mainConfig.SECRET_FORGOT_PASSWORD_KEY;
        }

        return jwt.verify(token, secretWord);
    }
}

export const jwtService = new JwtService();
