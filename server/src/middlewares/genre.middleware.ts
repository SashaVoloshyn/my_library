import { NextFunction, Response } from 'express';

import { IGenre, IRequest } from '../interfaces';
import { genreSchema } from '../utils';
import { ErrorHandler } from '../errors';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { errorMessageConstants } from '../constants';
import { genreRepository } from '../repositories';

class GenreMiddleware {
    public checkParamsName(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { params } = req;

            const { error, value } = genreSchema.validate(params);

            if (error) {
                next(new ErrorHandler(
                    errorMessageConstants.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            const genre = value as IGenre;
            req.genre = { name: genre.name };

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const genre = req.body;

            const { error, value } = genreSchema.validate(genre);

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.genre = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const genre = req.genre as IGenre;

            const genreDB = await genreRepository.getOneByName(genre.name);

            if (genreDB) {
                next(new ErrorHandler(
                    errorMessageConstants.genreAlreadyExists,
                    HttpStatusEnum.CONFLICT,
                    HttpMessageEnum.CONFLICT,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const genre = req.genre as IGenre;

            const genreDB = await genreRepository.getOneByName(genre.name);

            if (!genreDB) {
                next(new ErrorHandler(
                    errorMessageConstants.genreAlreadyExists,
                    HttpStatusEnum.CONFLICT,
                    HttpMessageEnum.CONFLICT,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}
export const genreMiddleware = new GenreMiddleware();
