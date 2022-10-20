import { Request } from 'express';

import { IAlreadyRead } from '../already-read.interface';
import { IAuthor, IAuthorNewFields } from '../author.interface';
import { IBook } from '../book.interface';
import { IComment } from '../comment.interface';
import { IFavorite } from '../favorite.interface';
import { IGenre } from '../genre.interface';
import { IRating } from '../rating.interface';
import { IUser } from '../user.interface';
import { IWillRead } from '../will-read.interface';
import { IPayload } from '../token.interface';
import { Authors, Books, Users } from '../../entities';
import { IView } from '../view.interface';

export interface IRequest extends Request{
    alreadyReadBook?: IAlreadyRead,
    author?: IAuthor | Authors,
    authorPatch?: IAuthorNewFields,
    book?: IBook | Books,
    comment?: IComment,
    favorite?: IFavorite,
    genre?: IGenre,
    rating?: IRating,
    user?: IUser | Users,
    willRead?: IWillRead,
    payload?: IPayload;
    authorizatePassword?: string
    authorization?: string,
    email?: string,
    password?: string,
    clientKey?: string,
    pageQuery?: number,
    bookId?: string;
    generateKey?: string;
    views?: IView;
    err?: string | null,

}
