import { NextFunction } from 'express';

import {
    IBook, IFileExtended, IRequest, IResponse,
} from '../interfaces';
import { Books } from '../entities';
import { bookRepository } from '../repositories';
import { errorMessageConstants } from '../constants';
import { ErrorHandler } from '../errors';
import {
    FileEnum, HttpMessageEnum, HttpStatusEnum, ItemTypeFileEnum,
} from '../enums';
import { bookService, googleCloudService, s3Service } from '../services';
import { mainConfig } from '../configs';

class BooksController {
    public async getOneById(req: IRequest, res: IResponse<Books>, next: NextFunction): Promise<IResponse<Books> | undefined> {
        try {
            const { params } = req;

            const book = await bookRepository.getOneById(Number(params.id));

            if (!book) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: book,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequest, res: IResponse<Location>, next: NextFunction): Promise<IResponse<Location> | undefined> {
        try {
            const book = req.body as IBook;

            const bookCreated = await bookService.createWithRelationsByGenres({ book, genresId: book.genres });

            if (req.file && !req.files) {
                if (book?.fileText && !book?.fileAudio && !book?.cover) {
                    const textFileSave = await googleCloudService.upload(
                        req.file,
                        bookCreated.name,
                    );

                    if (!textFileSave) {
                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).location(`/books/${bookCreated.id}`).end();
                    }

                    const fileText = textFileSave!;

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }

                if (book?.cover && !book?.fileText && !book?.fileAudio) {
                    const coverSave = await s3Service.uploadFile(req.file, bookCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);

                    if (!coverSave.Location) {
                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).location(`/books/${bookCreated.id}`).end();
                    }

                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }

                if (req.book?.fileAudio && !book?.cover && !book?.fileText) {
                    const audioFileSave = await googleCloudService.upload(
                        req.file,
                        bookCreated.name,
                    );

                    if (!audioFileSave) {
                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).location(`/books/${bookCreated.id}`).end();
                    }

                    const fileAudio = audioFileSave!;

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }

                return res.status(HttpStatusEnum.CREATED).location(`/books/${bookCreated.id}`).end();
            }

            if (req.files && !req.file) {
                const files = req.files as IFileExtended;

                if (files.fileText) {
                    const fileTextElement = files.fileText[0];
                    const fileText = await googleCloudService.upload(
                        fileTextElement,
                        bookCreated.name,
                    );

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileText } });
                }

                if (files.cover) {
                    const fileCoverElement = files.cover[0];
                    const coverSave = await s3Service.uploadFile(fileCoverElement, bookCreated.id, FileEnum.PHOTOS, ItemTypeFileEnum.BOOKS);

                    if (!coverSave.Location) {
                        return res.status(HttpStatusEnum.PARTIAL_CONTENT).location(`/books/${bookCreated.id}`).end();
                    }

                    const cover = coverSave.Location.split(mainConfig.CLOUD_DOMAIN_NAME!)[1];

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { cover } });
                }

                if (files.fileAudio) {
                    const fileAudioElement = files.fileAudio[0];
                    const fileAudio = await googleCloudService.upload(
                        fileAudioElement,
                        bookCreated.name,
                    );

                    await bookService.patchingFields({ id: bookCreated.id, newFields: { fileAudio } });
                }
            }

            return res.status(HttpStatusEnum.CREATED).location(`/books/${bookCreated.id}`).end();
        } catch (e) {
            next(e);
        }
    }

    public async getAll(_: IRequest, res: IResponse<Books[]>, next: NextFunction): Promise<IResponse<Books[]> | undefined> {
        try {
            const books = await bookRepository.getAll();
            return res.status(HttpStatusEnum.OK).json({
                status: HttpStatusEnum.OK,
                data: books,
                message: HttpMessageEnum.OK,
            });
        } catch (e) {
            next(e);
        }
    }

    public async deleteOne(req:IRequest, res: IResponse<HttpMessageEnum.NO_CONTENT>, next: NextFunction)
        : Promise<IResponse<HttpMessageEnum.NO_CONTENT> | undefined> {
        try {
            const book = req.book as Books;
            await bookRepository.deleteOne(book.id);

            if (book.fileText) {
                await googleCloudService.deleteOne(book.fileText.split('/')[2]);
            }

            if (book.fileAudio) {
                await googleCloudService.deleteOne(book.fileAudio.split('/')[2]);
            }

            if (book.cover) {
                await s3Service.deleteFile(book.cover);
            }

            return res.status(HttpStatusEnum.NO_CONTENT).json({
                status: HttpStatusEnum.NO_CONTENT,
                data: HttpMessageEnum.NO_CONTENT,
                message: HttpMessageEnum.NO_CONTENT,
            });
        } catch (e) {
            next(e);
        }
    }
}

export const booksController = new BooksController();
