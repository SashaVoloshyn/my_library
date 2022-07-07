import jwt, { JwtPayload } from 'jsonwebtoken';

import { mainConfig } from '../configs';

class JwtService {
    public sign(payload: any, type = 'access'): string {
        let secretWord = mainConfig.SECRET_ACCESS_KEY;
        let expiresIn = mainConfig.EXPIRES_IN_ACCESS;

        if (type === 'refresh') {
            secretWord = mainConfig.SECRET_REFRESH_KEY;
            expiresIn = mainConfig.EXPIRES_IN_REFRESH;
        }

        if (type === 'forgot') {
            secretWord = mainConfig.SECRET_FORGOT_PASSWORD_KEY;
            expiresIn = mainConfig.EXPIRES_IN_FORGOT_PASSWORD;
        }

        return jwt.sign(payload, secretWord, { expiresIn });
    }

    public verify(token: string, type = 'access'): string | JwtPayload {
        let secretWord = mainConfig.SECRET_ACCESS_KEY;

        if (type === 'refresh') {
            secretWord = mainConfig.SECRET_REFRESH_KEY;
        }

        return jwt.verify(token, secretWord);
    }
}

export const jwtService = new JwtService();
