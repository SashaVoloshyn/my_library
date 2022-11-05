import { Router } from 'express';

import { commentsController } from '../controllers';
import { authMiddleware, commentMiddleware, paginationMiddleware } from '../middlewares';

export const commentsRouter = Router();

commentsRouter.get(
    '/',
    paginationMiddleware.checkQuery,
    commentsController.getAll,
);
commentsRouter.post(
    '/',
    authMiddleware.authorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    commentMiddleware.validateBody,
    commentMiddleware.checkBookExistsById,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    commentMiddleware.checkAlreadyExists,
    commentsController.createOne,
);
commentsRouter.post(
    '/likes',
    authMiddleware.authorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    commentMiddleware.validateBodyActions,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    commentMiddleware.isCommentExists,
    commentMiddleware.isActionsUnique,
    commentsController.addAction,
);
commentsRouter.get(
    '/likes/:id',
    commentMiddleware.checkParamsById,
    commentsController.getOneActions,
);
commentsRouter.patch(
    '/likes/:id',
    commentMiddleware.checkParamsById,
    authMiddleware.authorization,
    authMiddleware.checkAuthorizationOnBearer,
    commentMiddleware.validateUpdateBodyActions,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    commentMiddleware.checkActionsExists,
    commentsController.updateAction,
);
commentsRouter.delete(
    '/likes/:id',
    commentMiddleware.checkParamsById,
    authMiddleware.isClientKey,
    authMiddleware.authorization,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    commentMiddleware.checkActionsExists,
    commentsController.removeAction,
);
