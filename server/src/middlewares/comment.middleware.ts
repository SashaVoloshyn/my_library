import { NextFunction } from 'express';

import {
    ICommentCreate, ICommentLikes, ICommentLikesCreate, IRequest, IResponse,
} from '../interfaces';
import { commentActionsSchema, commentSchema, commentUpdateActionsSchema } from '../utils';
import { ErrorHandler } from '../errors';
import { ClientEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { Users } from '../entities';
import { bookRepository, commentRepository } from '../repositories';
import { errorMessageConstants } from '../constants';
import { clientService, likeAndDisLikeService } from '../services';

class CommentMiddleware {
    public validateBody(req: IRequest, _: IResponse<any>, next: NextFunction): void {
        try {
            const { body } = req;

            const { error, value } = commentSchema.validate(body);

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            const { clientKey, bookId, text } = value as ICommentCreate;
            req.comment = { bookId, text };
            req.clientKey = clientKey;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBodyActions(req: IRequest, _: IResponse<any>, next: NextFunction): void {
        try {
            const { body } = req;
            console.log(body);

            const { error, value } = commentActionsSchema.validate(body);
            console.log(value,'vaaalueees')

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.commentLikes = { ...value };
            req.clientKey = value.clientKey;

            console.log(req.commentLikes,'coooment likes');

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateUpdateBodyActions(req: IRequest, _: IResponse<any>, next: NextFunction): void {
        try {
            const { body } = req;

            const { error, value } = commentUpdateActionsSchema.validate(body);

            if (error) {
                next(new ErrorHandler(
                    error.message,
                    HttpStatusEnum.BAD_REQUEST,
                    HttpMessageEnum.BAD_REQUEST,
                ));
                return;
            }

            req.commentLikes = { ...value };
            req.clientKey = value.clientKey;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkAlreadyExists(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { id } = req.user! as Users;
            const { bookId, text } = req.comment!;
            console.log(id, 'id');
            console.log(req.user, 'data');

            const comments = await commentRepository.getAllByUserIdAndBookId(bookId, id);

            if (comments?.length) {
                comments.forEach((comment) => {
                    if (comment.text.toLowerCase() === text.toLowerCase()) {
                        return next(new ErrorHandler(
                            errorMessageConstants.flood,
                            HttpStatusEnum.CONFLICT,
                            HttpMessageEnum.CONFLICT,
                        ));
                    }
                });
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkParamsById(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { params } = req;

            if (!params.id) {
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

    public async checkActionsExists(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params!;
            const { nickName, id: userId } = req.user as Users;

            const generateKey = clientService.generateClientKey(nickName, ClientEnum.ACTIONS_LIKES, id);
            const likes = await likeAndDisLikeService.getOneByCommentId(generateKey);

            if (!likes) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            const commentLikes = req.commentLikes as ICommentLikes;
            req.commentLikes = { ...commentLikes, userId };
            req.generateKey = generateKey;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isActionsUnique(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { commentId } = req.commentLikes as ICommentLikesCreate;
            const { nickName } = req.user as Users;

            const generateKey = clientService.generateClientKey(nickName, ClientEnum.ACTIONS_LIKES, commentId.toString());
            const likes = await likeAndDisLikeService.getOneByCommentId(generateKey);

            if (likes) {
                next(new ErrorHandler(
                    errorMessageConstants.badRequest,
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

    public async isCommentExists(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { commentId } = req.commentLikes as ICommentLikesCreate;

            const comment = await commentRepository.getOneById(commentId);

            if (!comment) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }

            const { id } = req.user as Users;

            const commentLikes = req.commentLikes as ICommentLikesCreate;

            req.commentLikes = { ...commentLikes, userId: id };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkBookExistsById(req: IRequest, _: IResponse<any>, next: NextFunction): Promise<void> {
        try {
            const { bookId } = req.comment!;

            const book = await bookRepository.getOneById(bookId);

            if (!book) {
                next(new ErrorHandler(
                    errorMessageConstants.notFound,
                    HttpStatusEnum.NOT_FOUND,
                    HttpMessageEnum.NOT_FOUND,
                ));
                return;
            }
            console.log('booook idididi');

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
