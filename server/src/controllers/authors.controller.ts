import { NextFunction } from 'express';
import { UpdateResult } from 'typeorm';

import { mainConfig } from '../configs';
import { errorMessageConstants } from '../constants';
import { ErrorHandler } from '../errors';
import { Authors } from '../entities';
import { authorService, s3Service } from '../services';
import { authorRepository } from '../repositories';
import {
    FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum,
} from '../enums';
import { IAuthor, IRequest, IResponse } from '../interfaces';

class AuthorsController {
    public async getAllWithPagination(req: IRequest, res: IResponse<[Authors[], number]>, next: NextFunction)
        : Promise<IResponse<[Authors[], number]> | undefined> {
        try {
            if (req.pageQuery) {
                const authorsWithCount = await authorService.getAllWithPagination(req.pageQuery);

                if (!authorsWithCount[0]) {
                    next(new ErrorHandler(
                        errorMessageConstants.unknown,
                        HttpStatusEnum.INTERNAL_SERVER_ERROR,
                        HttpMessageEnum.INTERNAL_SERVER_ERROR,
                    ));
                    return;
                }

                return res.status(HttpStatusEnum.OK).json({
                    status: HttpStatusEnum.OK,
                    data: authorsWithCount,
                    message: HttpMessageEnum.OK,
                });
            }

            const authorsWithCount = await authorService.getAllWithPagination();

            if (!authorsWithCount[0]) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorsWithCount,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Authors>, next: NextFunction): Promise<IResponse<Authors> | undefined> {
        try {
            const author = req.author as IAuthor;
            const genresId = author.genres as number[];

            if (req.file) {
                const authorCreated = await authorService.createWithRelationsByGenres({ author, genresId });
                const photoSaved = await s3Service.uploadFile(req.file, authorCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.AUTHORS);

                if (!photoSaved.Location) {
                    return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: HttpStatusEnum.PARTIAL_CONTENT,
                        data: authorCreated,
                        message: HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }
                const pathToFile = photoSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];
                await authorService.patchingFields({ id: authorCreated.id, newFields: { photo: pathToFile } });

                return res.status(HttpStatusEnum.CREATED).json({
                    status: HttpStatusEnum.CREATED,
                    data: { ...authorCreated, photo: pathToFile },
                    message: HttpMessageEnum.CREATED,
                });
            }

            const authorCreated = await authorService.createWithRelationsByGenres({ author, genresId });

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.CREATED,
                data: authorCreated,
                message: HttpMessageEnum.CREATED,
            });
        } catch (e) {
            next(e);
        }
    }

    public async patchOne(req: IRequest, res: IResponse<UpdateResult | Authors>, next: NextFunction)
        : Promise<IResponse<UpdateResult> | undefined> {
        try {
            const author = req.author as Authors;
            const newFields = req.authorPatch!;

            if (req.file) {
                const photoSaved = await s3Service.uploadFile(req.file, author.id, FileEnum.PHOTOS, ItemTypeFileEnum.AUTHORS);

                if (!photoSaved.Location) {
                    return res.status(HttpStatusEnum.PARTIAL_CONTENT).json({
                        status: HttpStatusEnum.PARTIAL_CONTENT,
                        data: { ...author, photo: undefined },
                        message: HttpMessageEnum.PARTIAL_CONTENT,
                    });
                }

                const pathToFile = photoSaved.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];
                const authorUpdated = await authorService.patchingFields({
                    id: author.id,
                    newFields: { ...newFields, photo: pathToFile },
                });

                return res.status(HttpStatusEnum.OK).json({
                    status: HttpStatusEnum.OK,
                    data: authorUpdated!,
                    message: HttpMessageEnum.OK,
                });
            }

            const authorUpdated = await authorService.patchingFields({ id: author.id, newFields });

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorUpdated!,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async getOneById(req: IRequest, res: IResponse<Authors | null>, next:NextFunction): Promise<IResponse<Authors> | undefined> {
        try {
            const { params } = req;

            const authorFromDB = await authorRepository.getOneById(Number(params.id));

            if (!authorFromDB) {
                next(new ErrorHandler(errorMessageConstants.notFound, HttpStatusEnum.NOT_FOUND, HttpMessageEnum.NOT_FOUND));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: authorFromDB,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req: IRequest, res: IResponse<HttpMessageEnum.NO_CONTENT>, next: NextFunction)
        : Promise<IResponse<HttpMessageEnum.NO_CONTENT> | undefined> {
        try {
            const author = req.author as Authors;

            const authorDeleted = await authorRepository.removeById(author.id);

            if (!authorDeleted) {
                next(new ErrorHandler(
                    errorMessageConstants.unknown,
                    HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    HttpMessageEnum.INTERNAL_SERVER_ERROR,
                ));
                return;
            }

            return res.status(HttpStatusEnum.CREATED).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: HttpMessageEnum.NO_CONTENT,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }
}
export const authorsController = new AuthorsController();
