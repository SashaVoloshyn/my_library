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

        const saveToken = await clientService.setExpire(
            clientKey,
            Number(mainConfig.EXPIRES_CLIENT_TOKENS_PAIR),
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
