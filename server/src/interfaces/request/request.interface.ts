import { Request } from 'express';

import { IAlreadyRead } from '../already-read.interface';
import { IAuthor } from '../author.interface';
import { IBook } from '../book.interface';
import { IComment } from '../comment.interface';
import { IFavorite } from '../favorite.interface';
import { IGenre } from '../genre.interface';
import { IRating } from '../rating.interface';
import { IUser } from '../user.interface';
import { IWillRead } from '../will-read.interface';
import { Users } from '../../entities';

export interface IRequest extends Request{
    alreadyReadBook?: IAlreadyRead,
    author?: IAuthor,
    book?: IBook,
    comment?: IComment,
    favorite?: IFavorite,
    genre?: IGenre,
    rating?: IRating,
    user?: IUser | Users,
    willRead?: IWillRead,
    authorizatePassword?: string
    authorization?: string,
    email?: string,
}
