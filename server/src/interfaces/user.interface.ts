import { RoleEnum } from '../enums';

export interface IUser {
    nickName: string,
    password: string,
    email: string,
    role?: RoleEnum
}

export interface IUniqueUserField{
    email?: string,
    nickName?: string
}
