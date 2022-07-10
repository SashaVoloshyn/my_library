import { IPayload, IUser } from '../interfaces';
import { userService } from './user.service';
import { jwtService } from './jwt.service';
import { clientService } from './client.service';

class AuthService {
    public async registration(user: IUser): Promise<any> {
        const createUser = await userService.createOne(user);
        return createUser;
    }

    public async login(payload: IPayload, clientKey: string): Promise<any> {
        const genereteToken = await jwtService.generateTokenPair(payload, clientKey);
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
}

export const authService = new AuthService();
