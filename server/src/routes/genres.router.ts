import { Router } from 'express';
import { genresController } from '../controllers';
import { genreMiddleware } from '../middlewares';

export const genresRouter = Router();

genresRouter.get(
    '/',
    genresController.getAll,
);

genresRouter.post(
    '/',
    genreMiddleware.validateBody,
    genreMiddleware.isUnique,
    genresController.createOne,
);

genresRouter.get(
    '/:id',
    genresController.getOne,
);

genresRouter.delete(
    '/:name',
    genreMiddleware.checkParamsName,
    genreMiddleware.checkExists,
    genresController.removeOne,
);
