import { UpdateResult } from 'typeorm';

import { userRepository } from '../repositories';
import { IUniqueUserField, IUser } from '../interfaces';
import { bcryptService } from './bcrypt.service';
import { Users } from '../entities';

export class UserService {
    public async getOneByEmailOrNickName(data: IUniqueUserField): Promise<Users | null> {
        return userRepository.getOneByEmailOrNickName(data);
    }

    public async createOne(user: IUser): Promise<Users> {
        const { password } = user;
        const passwordHashed = await bcryptService.hashPassword(password);
        const data = { ...user, password: passwordHashed };
        const createUser = await userRepository.createOne(data);
        return createUser;
    }

    public async changePassword(id: number, password: string): Promise<UpdateResult> {
        const hashPassword = await bcryptService.hashPassword(password);
        return userRepository.changePassword(id, hashPassword);
    }
}
export const userService = new UserService();
