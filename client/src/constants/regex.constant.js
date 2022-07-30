export const regexConstant = {
    NICKNAME: /^[A-ZА-ЯІЇҐ][a-zа-яіїґ0-9]*(([,.] |[ '-])[A-Za-zА-ЯІЇҐа-яіїґ0-9][a-zа-яіїґ0-9]*)*(\.?)( [IVXLCDM]+)?$/,
    PASSWORD: /^(?!.* )(?=.*\d)(?=.*[A-ZА-ЯІЇҐ])/,
    EMAIL: /^.+@[^@]+\.[^@]{2,}$/,
};