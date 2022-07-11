import Joi from 'joi';
import { regexConstant } from '../constants';

export const joiCommonValidator = {
    email: Joi.string().email().regex(regexConstant.EMAIL).min(5)
        .max(25)
        .lowercase()
        .trim(),
    password: Joi.string().regex(regexConstant.PASSWORD).min(7).max(30)
        .trim(),
    nickName: Joi.string().min(3).max(20).trim(),
    token: Joi.string()
        .min(10),
    clientKey: Joi.string(),
};
