import { Router } from 'express';

import { authorsController } from '../controllers';
import { authorMiddleware, authorPhoto } from '../middlewares';

export const authorsRouter = Router();
const upload = authorPhoto();

authorsRouter.get(
    '/',
    authorMiddleware.checkPage,
    authorsController.getAllWithPagination,
);

authorsRouter.get(
    '/:id',
    authorMiddleware.checkParamsId,
    authorsController.getOneById,
);

authorsRouter.post(
    '/',
    upload.single('photo'),
    authorMiddleware.validateBody,
    authorMiddleware.checkPseudonymExists,
    authorsController.createOne,
);

authorsRouter.patch(
    '/:id',
    upload.single('photo'),
    authorMiddleware.validatePatchBody,
    authorMiddleware.checkExists,
    authorsController.patchOne,
);

authorsRouter.delete(
    '/:id',
    authorMiddleware.checkParamsId,
    authorMiddleware.checkExists,
    authorsController.deleteOne,
);
