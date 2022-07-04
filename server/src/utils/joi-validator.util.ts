import Joi from 'joi';

class JoiValidatorUtil {
    public static userSchema: Joi.ObjectSchema = Joi.object({
        nickName: Joi.string().min(4).max(20).trim()
            .required()
            .messages({ 'any.only': 'Must be a valid email address' }),
        password: Joi.string().min(7).max(40).trim()
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
}

export const { userSchema } = JoiValidatorUtil;
