import { Router } from 'express';
import multer from 'multer';

import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares';
import { errorMessageConstants, filesConstant, fileSizeConstant } from '../constants';
import { IRequest } from '../interfaces';
import { FileEnum, HttpMessageEnum, HttpStatusEnum } from '../enums';
import { ErrorHandler } from '../errors';

export const authRouter = Router();

const upload = multer({
    limits: { fileSize: fileSizeConstant.SIZE_AVATAR },
    fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
        if (!filesConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
            return callback(
                new ErrorHandler(errorMessageConstants.fileMimetype, HttpStatusEnum.BAD_REQUEST, HttpMessageEnum.BAD_REQUEST),
            );
        }
        callback(null, true);
    },
});

authRouter.post(
    '/registration',
    upload.single('avatar'),
    authMiddleware.registrationBodyValidate,
    authMiddleware.checkUserIsUniq,
    authController.registration,
);

authRouter.post(
    '/login',
    authMiddleware.loginBodyValidate,
    authMiddleware.checkUserExistByEmail,
    authMiddleware.checkUserPassword,
    authController.login,
);

authRouter.post(
    '/logout',
    authMiddleware.authorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyAccessToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.logout,
);

authRouter.post(
    '/refresh',
    authMiddleware.authorization,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyRefreshToken,
    authMiddleware.wasItIssuedToken,
    authMiddleware.checkUserAuthByPayload,
    authController.refresh,
);

authRouter.post(
    '/forgotPassword',
    authMiddleware.validateEmail,
    authMiddleware.checkUserExistByEmail,
    authMiddleware.alreadyExistsForgotToken,
    authController.forgotPassword,

);

authRouter.patch(
    '/forgotPassword',
    authMiddleware.authorization,
    authMiddleware.isPassword,
    authMiddleware.isClientKey,
    authMiddleware.checkAuthorizationOnBearer,
    authMiddleware.validateAuthorizationToken,
    authMiddleware.verifyForgotToken,
    authMiddleware.checkUserAuthByPayload,
    authMiddleware.isAuthClientKey,
    authController.changePassword,

);
