import Joi from 'joi';

import { regexConstant, validationMessageErrorConstant } from '../../constants';

export const authRegistrationFormValidator = Joi.object({
    nickName: Joi.string().min(4).max(20).trim()
        .regex(regexConstant.NICKNAME)
        .trim()
        .required()
        .messages(validationMessageErrorConstant),
    email: Joi.string()
        .min(5)
        .max(35)
        .regex(regexConstant.EMAIL)
        .lowercase()
        .trim()
        .required()
        .messages(validationMessageErrorConstant),
    password: Joi.string().min(7).max(40).trim()
        .regex(regexConstant.PASSWORD)
        .disallow(Joi.ref('nickName'), Joi.ref('email'))
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'any.invalid': 'пароль не може бути нікнеймом, чи поштою!',
        }),
    confirmPassword: Joi.any().valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'паролі не збігаються',
        }),
    avatar: Joi.any()
        .meta({ swaggerType: 'file' })
        .optional()
        .messages(validationMessageErrorConstant),
});