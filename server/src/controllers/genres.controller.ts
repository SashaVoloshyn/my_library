import { NextFunction } from 'express';

import { IGenre, IRequest, IResponse } from '../interfaces';
import { Genres } from '../entities';
import { genreRepository } from '../repositories';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';
import { errorMessageConstants } from '../constants';

class GenresController {
    public async getAll(_: IRequest, res: IResponse<Genres[]>, next: NextFunction): Promise<IResponse<Genres[]> | undefined> {
        try {
            const genres = await genreRepository.getAll();

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: genres,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequest, res: IResponse<Genres>, next: NextFunction): Promise<IResponse<Genres> | undefined> {
        try {
            const { id } = req.params;

            const genre = await genreRepository.getOneById(Number(id)) as Genres;
            console.log(genre, 'ggggggggggggggggggg');

            if (!genre) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: genre,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Genres>, next: NextFunction): Promise<IResponse<Genres> | undefined> {
        try {
            const genre = req.body as IGenre;
            const genreCreated = await genreRepository.createOne(genre);

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: genreCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequest, res: IResponse<HttpMessageEnum.OK>, next: NextFunction)
        : Promise<IResponse<HttpMessageEnum.OK> | undefined> {
        try {
            const genres = req.genre!;

            const deleteResult = await genreRepository.removeByName(genres?.name);

            if (!deleteResult) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: HttpMessageEnum.OK,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const genresController = new GenresController();
