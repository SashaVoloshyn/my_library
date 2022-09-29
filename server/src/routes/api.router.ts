import {
    Request, Response, NextFunction, Router,
} from 'express';
import { authRouter } from './auth.router';
import { HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';
import { genresRouter } from './genres.router';
import { authorsRouter } from './authors.router';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/genres', genresRouter);
apiRouter.use('/authors', authorsRouter);

// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || HttpStatusEnum.INTERNAL_SERVER_ERROR).json({
        message: err.message,
        error: err?.error || HttpMessageEnum.INTERNAL_SERVER_ERROR,
        status: err?.status || HttpStatusEnum.INTERNAL_SERVER_ERROR,
    });
});
