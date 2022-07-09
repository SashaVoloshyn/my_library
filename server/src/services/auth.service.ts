import { IUser } from '../interfaces';
import { userService } from './user.service';
import { Users } from '../entities';
import { userRepository } from '../repositories';

class AuthService {
    public async registration(user:IUser): Promise<any> {
        const createUser = await userService.createOne(user);
        return createUser;
    }

    public async regii(user: IUser): Promise<Users> {
        return userRepository.createOne(user);
    }
}
export const authService = new AuthService();
