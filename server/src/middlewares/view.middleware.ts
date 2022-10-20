import { NextFunction, Response } from 'express';

import { IRequest, IView, IViewParams } from '../interfaces';
import { ErrorHandler } from '../errors';
import { errorMessageConstants } from '../constants';
import { ClientEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { clientService } from '../services';
import { viewFirstCreateSchema } from '../utils';
import { bookRepository } from '../repositories';

class ViewMiddleware {
    public checkParamsOnBookId(req: IRequest, _: Response, next: NextFunction): void {
        const { params } = req;

        const { bookId } = Object.assign(params) as IViewParams;
        console.log(bookId, 'boook id');

        if (!bookId) {
            next(new ErrorHandler(
                errorMessageConstants.badRequest,
                HttpStatusEnum.BAD_REQUEST,
                HttpMessageEnum.BAD_REQUEST,
            ));
            return;
        }

        req.bookId = bookId;
        next();
    }

    public async isUnique(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.bookId!;
            const generateKey = clientService.generateClientKey(bookId, ClientEnum.VIEWS_COUNT_BOOK);

            const viewExists = await clientService.get(generateKey);

            if (viewExists) {
                next(new ErrorHandler(
                    errorMessageConstants.viewsForBookExists,
                    HttpStatusEnum.CONFLICT,
                    HttpMessageEnum.CONFLICT,
                ));
                return;
            }

            req.generateKey = generateKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const bookId = req.bookId!;
            const generateKey = clientService.generateClientKey(bookId, ClientEnum.VIEWS_COUNT_BOOK);

            const viewExists = await clientService.get(generateKey);

            if (!viewExists) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            const { views } = JSON.parse(viewExists) as IView;

            req.views = { views };
            req.generateKey = generateKey;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBodyOnBookId(req: IRequest, _: Response, next: NextFunction): void {
        const { body } = req;
        const { value, error } = viewFirstCreateSchema.validate(body);
        console.log(body, 'buuudy');
        console.log(value, 'value');

        if (error) {
            next(new ErrorHandler(
                errorMessageConstants.badRequest,
                HttpStatusEnum.BAD_REQUEST,
                HttpMessageEnum.BAD_REQUEST,
            ));
            return;
        }

        req.bookId = value.bookId.toString();
        req.views = { views: 1 };
        next();
    }

    public async checkBookExists(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        const bookId = req.bookId!;

        const book = await bookRepository.getOneById(Number(bookId));

        if (!book) {
            next(new ErrorHandler(
                errorMessageConstants.notFound,
                HttpStatusEnum.NOT_FOUND,
                HttpMessageEnum.NOT_FOUND,
            ));
            return;
        }

        next();
    }
}

export const viewMiddleware = new ViewMiddleware();
