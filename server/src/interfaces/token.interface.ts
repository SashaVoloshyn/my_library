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
    refreshToken: string,
    clientKey : string
}

export interface IPayload {
    nickName?: string,
    role?: RoleEnum | string,
    id?: number
}
export interface ITokenPayload {
    accessToken: string,
    refreshToken: string
    nickName?: string,
    role?: RoleEnum | string,
    id?: number
}

export interface IForgotToken {
    forgotToken: string,
    clientKey: string
}
