import {
    IForgotToken, IPayload, ITokenPair, IUser,
} from '../interfaces';
import { userService } from './user.service';
import { jwtService } from './jwt.service';
import { clientService } from './client.service';

class AuthService {
    public async registration(user: IUser): Promise<any> {
        const createUser = await userService.createOne(user);
        return createUser;
    }

    public async login(payload: IPayload): Promise<any> {
        const genereteToken = await jwtService.generateTokenPair(payload);
        if (!genereteToken) {
            return;
        }
        if (genereteToken) {
            const { accessToken, refreshToken, clientKey } = genereteToken;
            return {
                accessToken,
                refreshToken,
                clientKey,
            };
        }
    }

    public async logout(clientKey: string): Promise<any> {
        return clientService.delete(clientKey);
    }

    public async refresh(payload:IPayload, clientKey:string):Promise<ITokenPair | undefined> {
        const numbDeleted = await clientService.delete(clientKey);

        if (!numbDeleted) {
            return;
        }
        return jwtService.generateTokenPair(payload);
    }

    public async forgotPassword(payload: IPayload): Promise<IForgotToken| undefined> {
        return jwtService.generateForgotToken(payload);
    }
}

export const authService = new AuthService();
