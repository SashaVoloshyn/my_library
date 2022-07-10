import Joi from 'joi';
import { joiCommonValidator } from './joi-common-validator';
import { errorValidationMessageConst } from '../constants';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(3).max(20).trim()
            .required()
            .messages(errorValidationMessageConst),
        password: joiCommonValidator.password.trim()
            .required()
            .messages(errorValidationMessageConst),
        email: joiCommonValidator.email.trim()
            .required()
            .messages(errorValidationMessageConst),
        role: Joi.string().min(4).max(5).trim()
            .messages(errorValidationMessageConst)
            .optional(),
        avatar: Joi.binary().optional()
            .messages(errorValidationMessageConst),
    });

    public static loginSchema: Joi.ObjectSchema = Joi.object({
        email: joiCommonValidator.email.required().messages(errorValidationMessageConst).trim(),
        password: joiCommonValidator.password.required()
            .messages(errorValidationMessageConst).trim(),
    });

    public static passwordSchema: Joi.ObjectSchema = Joi.object({
        password: joiCommonValidator.password.trim()
            .required()
            .messages(errorValidationMessageConst),
    });

    public static emailSchema: Joi.ObjectSchema = Joi.object({
        password: joiCommonValidator.email.trim()
            .required()
            .messages(errorValidationMessageConst),
    });

    public static authTokenSchema: Joi.ObjectSchema = Joi.object({
        authorization: Joi.string().min(3).max(200).required(),
    });
}

export const {
    userSchema, loginSchema, authTokenSchema, passwordSchema, emailSchema,
} = JoiValidatorUtil;
