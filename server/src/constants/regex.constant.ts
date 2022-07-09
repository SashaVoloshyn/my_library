export const regexConstant = {
    NICKNAME: /^[A-Z][a-z]*(([,.] |[ '-])[A-Za-z][a-z]*)*(\.?)( [IVXLCDM]+)?$/,
    PASSWORD: /^(?!.* )(?=.*\d)(?=.*[A-Z])/,
    EMAIL: /^.+@[^@]+\.[^@]{2,}$/,

};
