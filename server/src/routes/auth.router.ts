import { Router } from 'express';

import { authController } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/registration', authController.regtest);
authRouter.post('/regii', authController.registration);
