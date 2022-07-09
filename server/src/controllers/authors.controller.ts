import { NextFunction } from 'express';

import { IAuthor, IRequest, IResponse } from '../interfaces';
import { Authors } from '../entities';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { authorRepository } from '../repositories';

class AuthorsController {
    // public async getAll(_: IRequest, res: IResponse<Authors[]>, next: NextFunction):
    //     Promise<IResponse<Authors[]> | undefined> {
    //     try {
    //         const authors = await authorRepository.getAll();
    //
    //         return res.status(HttpStatusEnum.OK).json({
    //             status: HttpStatusEnum.OK,
    //             data: authors,
    //             message: HttpMessageEnum.OK,
    //         });
    //     } catch (e) {
    //         next(e);
    //     }
    // }

    // eslint-disable-next-line consistent-return
    public async createOne(req: IRequest, res: IResponse<Authors>, next: NextFunction):
        Promise<IResponse<Authors> | undefined> {
        try {
            const author = req.body as IAuthor;

            const authorCreated = await authorRepository.createOne(author);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: authorCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authorsController = new AuthorsController();
