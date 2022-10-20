import Joi from 'joi';
import { joiCommonValidator } from './joi-common-validator';
import { errorValidationMessageConst, regexConstant } from '../constants';

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
        email: joiCommonValidator.email.trim()
            .required()
            .messages(errorValidationMessageConst),
    });

    public static clientKeySchema: Joi.ObjectSchema = Joi.object({
        clientKey: joiCommonValidator.clientKey
            .required()
            .messages(errorValidationMessageConst),
    });

    public static tokenSchema: Joi.ObjectSchema = Joi.object({
        token: joiCommonValidator.token
            .required()
            .messages(errorValidationMessageConst),
    });

    public static genreSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .min(2)
            .max(50)
            .required(),
    });

    public static authorSchema: Joi.ObjectSchema = Joi.object({
        firstName: Joi.string()
            .max(255)
            .trim()
            .messages(errorValidationMessageConst)
            .required(),
        lastName: Joi.string()
            .max(255)
            .trim()
            .messages(errorValidationMessageConst)
            .required(),
        biography: Joi.string()
            .trim()
            .max(8000)
            .messages(errorValidationMessageConst)
            .required(),
        country: Joi.string()
            .trim()
            .max(255)
            .messages(errorValidationMessageConst)
            .required(),
        dateBirthday: Joi.date()
            .messages(errorValidationMessageConst)
            .required(),
        dateDeath: Joi.date()
            .allow(null)
            .messages(errorValidationMessageConst)
            .optional(),
        photo: Joi.binary()
            .allow(null)
            .messages(errorValidationMessageConst)
            .optional(),
        pseudonym: Joi.string()
            .allow(null)
            .messages(errorValidationMessageConst)
            .optional(),
        genres: Joi.alternatives()
            .try(Joi.array().items(Joi.number()), Joi.number())
            .messages(errorValidationMessageConst)
            .required(),
    });

    public static authorPathSchema: Joi.ObjectSchema = Joi.object({
        dateDeath: Joi.date()
            .messages(errorValidationMessageConst)
            .optional(),
        photo: Joi.binary()
            .messages(errorValidationMessageConst)
            .optional(),
        pseudonym: Joi.string()
            .messages(errorValidationMessageConst)
            .optional(),
        biography: Joi.string()
            .trim()
            .max(8000)
            .messages(errorValidationMessageConst)
            .optional(),
        genres: Joi.alternatives()
            .try(Joi.array().items(Joi.number()), Joi.number())
            .messages(errorValidationMessageConst)
            .optional(),
    });

    public static bookSchema: Joi.ObjectSchema = Joi.object({
        name: Joi.string()
            .messages(errorValidationMessageConst)
            .min(1)
            .max(255)
            .required(),
        yearOfRelease: Joi.number()
            .messages(errorValidationMessageConst)
            .max(1300)
            .max(new Date().getFullYear())
            .optional(),
        description: Joi.string()
            .messages(errorValidationMessageConst)
            .min(100)
            .max(8000)
            .required(),
        fileText: Joi.binary()
            .messages(errorValidationMessageConst)
            .optional(),
        cover: Joi.binary()
            .messages(errorValidationMessageConst)
            .optional(),
        fileAudio: Joi.binary()
            .messages(errorValidationMessageConst)
            .optional(),
        authorId: Joi.number()
            .messages(errorValidationMessageConst)
            .required(),
        genres: Joi.alternatives()
            .try(Joi.array().items(Joi.number()), Joi.number())
            .messages(errorValidationMessageConst)
            .optional(),
    });

    public static viewFirstCreateSchema: Joi.ObjectSchema = Joi.object({
        bookId: Joi.number()
            .messages(errorValidationMessageConst)
            .required(),
    });

    public static commentSchema: Joi.ObjectSchema = Joi.object({
        bookId: Joi.number()
            .messages(errorValidationMessageConst)
            .required(),
        text: Joi.string()
            .trim()
            .messages(errorValidationMessageConst)
            .regex(regexConstant.BAD_WORDS, { invert: true })
            .required(),
        clientKey: joiCommonValidator.clientKey
            .required()
            .messages(errorValidationMessageConst),
    });
}

export const {
    userSchema, loginSchema, tokenSchema, clientKeySchema, passwordSchema,
    emailSchema, genreSchema, authorSchema, authorPathSchema, bookSchema,
    viewFirstCreateSchema, commentSchema,
} = JoiValidatorUtil;
