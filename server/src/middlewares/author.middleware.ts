import { NextFunction } from 'express';

import { IPage, IRequest, IResponse } from '../interfaces';
import { ErrorHandler } from '../errors';
import { errorMessageConstants } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { authorPathSchema, authorSchema } from '../utils';
import { authorService } from '../services';
import { authorRepository } from '../repositories';

class AuthorMiddleware {
    public checkPage(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const query = req.query as IPage;

            if (query.page && Number(query.page) <= 0) {
                next(new ErrorHandler(
                    errorMessageConstants.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            if (query.page) {
                req.pageQuery = Number(query.page);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const author = req.body;

            const { error, value } = authorSchema.validate(author);

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.author = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkPseudonymExists(req: IRequest, _: IResponse<void>, next: NextFunction): Promise<void> {
        try {
            const pseudonym = req.author?.pseudonym;

            const author = await authorService.getOneByPseudonym(pseudonym);

            if (author) {
                next(new ErrorHandler(
                    errorMessageConstants.authorAlreadyExists,
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

    public checkParamsId(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const { params } = req;

            if (!params?.id) {
                next(new ErrorHandler(
                    errorMessageConstants.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExists(req: IRequest, _: IResponse<void>, next: NextFunction): Promise<void> {
        try {
            const { params } = req;

            const authorFromDB = await authorRepository.getOneById(Number(params.id));

            if (!authorFromDB) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            req.author = authorFromDB;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validatePatchBody(req: IRequest, _: IResponse<void>, next: NextFunction): void {
        try {
            const author = req.body;

            const { error, value } = authorPathSchema.validate(author);

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.authorPatch = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authorMiddleware = new AuthorMiddleware();
