import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares';

export const authRouter = Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authMiddleware.loginBodyValidate, authMiddleware.checkUserExistByEmail, authMiddleware.checkUserPassword, authController.login);
authRouter.post('/logout');
authRouter.post('/forgotPassword');
