import jwt, { JwtPayload } from 'jsonwebtoken';

import { mainConfig } from '../configs';
import { IForgotToken, IPayload, ITokenPair } from '../interfaces';
import { constants } from '../constants';
import { clientService } from './client.service';
import { ClientEnum } from '../enums';
import { Users } from '../entities';

class JwtService {
    public async generateTokenPair(payload:IPayload)
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

        const clientKey = clientService.generateClientKey(payload.nickName!, ClientEnum.AUTHTOKEN) as string;
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

    public async generateForgotToken(payload: IPayload): Promise<IForgotToken | undefined> {
        const { nickName } = payload as Users;
        const forgotToken = jwt.sign(
            payload,
            mainConfig.SECRET_FORGOT_PASSWORD_KEY as string,
            { expiresIn: mainConfig.EXPIRES_IN_FORGOT_PASSWORD },
        );
        const clientKey = clientService.generateClientKey(nickName, ClientEnum.FORGOTTOKEN);

        if (clientKey) {
            const savedToken = await clientService
                .setExpire(clientKey, Number(mainConfig.EXPIRES_CLIENT_FORGOT), JSON.stringify({ forgotToken }));
            if (!savedToken) {
                return;
            }

            return {
                clientKey,
                forgotToken,
            };
        }
    }
}

export const jwtService = new JwtService();
