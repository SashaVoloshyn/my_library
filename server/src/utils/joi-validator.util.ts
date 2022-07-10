import Joi from 'joi';
import { joiCommonValidator } from './joi-common-validator';
import { errorValidationMessageConst } from '../constants';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(3).max(20).trim()
            .required()
            .messages({ 'any.only': 'Must be a valid email address' }),
        password: Joi.string().min(7).max(30).trim()
            .required()
            .messages({ 'any.only': 'Must be a valid email address' }),
        email: Joi.string().email().min(5).max(25)
            .trim()
            .required()
            .messages({ 'any.only': 'Must be a valid email address' }),
        role: Joi.string().min(4).max(5).trim()
            .messages({ 'any.only': 'Must be a valid email address' })
            .optional(),
    });

    public static loginSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonValidator.email.required().messages(errorValidationMessageConst).trim(),
        password: joiCommonValidator.password.required()
            .messages(errorValidationMessageConst).trim(),
    });

    public static authTokenSchema: Joi.ObjectSchema = Joi.object({
        authorization: Joi.string().min(3).max(200).required(),
    });
}

export const { userSchema, loginSchema, authTokenSchema } = JoiValidatorUtil;
