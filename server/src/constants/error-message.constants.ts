export const errorMessageConstants = {
    userAlreadyExists: 'Користувач вже існує.',
    userNotFound: 'Вибачте, користувача не знайдено, будь ласка зареєструйтесь',
    unauthorized: 'Невірний email або пароль.',
    unknown: 'Невідома помилка',
    clientKey: 'Неправильні дані, число ключа повино бути більше рівне нулю (>= 0), а тип ClientKeyEnum',
    userNotRegistration: 'ПОМИЛКА СЕРВЕРА: НЕ ВДАЛОСЯ ЗАПИСАТИ КОРИСТУВАЧА',
    authorization: 'Немає авторизованних данних',
    fileMimetype: 'Неправильний формат файлу',

};

export const errorValidationMessageConst = {
    'string.empty': 'Поле не може бути пустим',
    'string.base': 'Поле повинно бути текстом',
    'string.min': 'Довжина поля повинна бути не менше {#limit} символів',
    'string.max': 'Довжина поля повинна бути не більше {#limit} символів',
    'any.required': "Поле є обов'язковим",
    'number.base': ' Поле має бути числом',
    'number.empty': 'Поле не може бути пустим',
    'number.min': 'мінімальне число {#limit}',
    'number.max': 'мінімальне число {#limit}',
};
