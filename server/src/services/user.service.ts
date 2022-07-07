import { userRepository } from '../repositories';
import { IUser } from '../interfaces';

export class UserService {
    getOneByEmailOrNickName(data: IUser): any {
        return userRepository.getOneByEmailOrNickName(data);
    }
}

export const userService = new UserService();
