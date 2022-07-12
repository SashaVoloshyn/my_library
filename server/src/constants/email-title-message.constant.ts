import { EmailEnum } from '../enums';

export const emailTitleMessageConstant = {
    [EmailEnum.WELCOME]: 'дякуємо що стали частиною нашої спільноти.',
    [EmailEnum.WELCOME_BACK]: 'раді вас бачити знову.',
    [EmailEnum.FORGOT_PASSWORD]: 'забули пароль?',
    [EmailEnum.CHANGE_PASSWORD]: 'ваш пароль було змінено.',
};
