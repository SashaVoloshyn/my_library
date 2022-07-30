import Joi from 'joi';

import { regexConstant, validationMessageErrorConstant } from '../../constants';

export const authLoginFormValidator = Joi.object({
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
        .disallow(Joi.ref('email'))
        .trim()
        .required()
        .messages({
            ...validationMessageErrorConstant,
            'any.invalid': 'пароль і псевдонім не можуть бути однаковими!',
        }),
});