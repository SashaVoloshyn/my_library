import { userRepository } from '../repositories';
import { IUser } from '../interfaces';
import { bcryptService } from './bcrypt.service';
import { Users } from '../entities';

export class UserService {
    getOneByEmailOrNickName(data: IUser): any {
        return userRepository.getOneByEmailOrNickName(data);
    }

    public async createOne(user: IUser): Promise<Users> {
        const { password } = user;
        const passwordHashed = await bcryptService.hashPassword(password);
        const data = { ...user, password: passwordHashed };
        const createUser = await userRepository.createOne(data);
        return createUser;
    }
}
export const userService = new UserService();