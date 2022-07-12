import { EmailEnum } from '../enums';
import { mainConfig } from '../configs';

export const emailTemplateConstant = {
    [EmailEnum.WELCOME]: {
        subject: `Ласкаво просимо на ${mainConfig.PROJECT_NAME}`,
        template: 'welcome',
    },
    [EmailEnum.WELCOME_BACK]: {
        subject: `Раді знову вас бачити на ${mainConfig.PROJECT_NAME}`,
        template: 'welcome-back',
    },
    [EmailEnum.FORGOT_PASSWORD]: {
        subject: `Відновлення пароля на ${mainConfig.PROJECT_NAME}`,
        template: 'forgot-password',
    },
    [EmailEnum.CHANGE_PASSWORD]: {
        subject: `Пароль ${mainConfig.PROJECT_NAME} змінено`,
        template: 'change-password',
    },
};
