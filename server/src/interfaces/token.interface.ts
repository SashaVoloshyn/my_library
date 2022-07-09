import { IUser } from './user.interface';
import { ICommonFields } from './commonFields.interface';
import { RoleEnum } from '../enums';

export interface IToken extends ICommonFields{
    refreshToken: string,
    accessToken: string,
    userId: number,
    user? : IUser
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string
}

export interface ITokenPayload {
    nickName?: string,
    role?: RoleEnum | string,
    id?: number
}
