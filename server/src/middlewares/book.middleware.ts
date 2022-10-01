import { NextFunction, Response } from 'express';

import { IFileExtended, IRequest } from '../interfaces';
import { ErrorHandler } from '../errors';
import { errorMessageConstants, fileSizeConstant } from '../constants';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { bookService } from '../services/books.service';
import { bookRepository } from '../repositories';
import { Books } from '../entities';
import { bookSchema } from '../utils';

class BookMiddleware {
    public checkParamsId(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { params } = req;

            if (!params?.id && (Number(params.id) > 0)) {
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

    public validateBody(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { body } = req;

            const { value, error } = bookSchema.validate(body);

            if (error) {
                next(new ErrorHandler(
                    errorMessageConstants.badRequest,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.book = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkFilesSize(req: IRequest, _: Response, next: NextFunction): void {
        if (req.file && !req.files) {
            if (req.book?.fileText && !req.book.fileAudio && !req.book.cover) {
                if (req.file.size > fileSizeConstant.SIZE_BOOK_TEXT_FILE) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }

            if (req.book?.cover && !req.book.fileText && !req.book.fileAudio) {
                if (req.file.size > fileSizeConstant.SIZE_COVER) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }

            if (req.book?.fileAudio && !req.book.cover && !req.book.fileText) {
                if (req.file.size > fileSizeConstant.SIZE_AUDIO_BOOK) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }
        }

        if (req.files && !req.file) {
            const files = req.files as IFileExtended;

            if (files.fileAudio) {
                if (files.fileAudio[0].size > fileSizeConstant.SIZE_AUDIO_BOOK) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }

            if (files.fileText) {
                if (files.fileText[0].size > fileSizeConstant.SIZE_BOOK_TEXT_FILE) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }

            if (files.cover) {
                if (files.cover[0].size > fileSizeConstant.SIZE_COVER) {
                    next(new ErrorHandler(
                        errorMessageConstants.fileSize,
                        HttpStatusEnum.BAD_REQUEST,
                        HttpMessageEnum.BAD_REQUEST,
                    ));
                    return;
                }
            }
        }
        next();
    }

    public async isBooksExistsByDescription(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const book = req.book!;

            const bookDB = await bookService.isBooksExists(book?.description);

            if (bookDB) {
                next(new ErrorHandler(
                    errorMessageConstants.bookAlreadyExists,
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

    public checkQueryParamsId(req: IRequest, _: Response, next: NextFunction): void {
        try {
            const { params } = req;

            if (!params?.id) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkBookExistsById(req: IRequest, _: Response, next: NextFunction): Promise<void> {
        try {
            const id = req.params.id!;

            const book = await bookRepository.getOneById(Number(id));

            if (!book) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            req.book = book as Books;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const bookMiddleware = new BookMiddleware();
