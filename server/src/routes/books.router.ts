import { Router } from 'express';

import { bookMiddleware, bookTextAudioCoverFields } from '../middlewares';
import { booksController } from '../controllers';
import { filesUploadFields } from '../constants';

export const booksRouter = Router();

const filesUpload = bookTextAudioCoverFields();

booksRouter.get('/', booksController.getAll);
booksRouter.get(
    '/:id',
    bookMiddleware.checkParamsId,
    booksController.getOneById,
);
booksRouter.post(
    '/',
    filesUpload.fields(filesUploadFields),
    bookMiddleware.validateBody,
    bookMiddleware.checkFilesSize,
    bookMiddleware.isBooksExistsByDescription,
    booksController.createOne,
);
booksRouter.delete(
    '/:id',
    bookMiddleware.checkQueryParamsId,
    bookMiddleware.checkBookExistsById,
    booksController.deleteOne,
);
