import {keyValidationError} from "./keyValidationError.constant";

export const validationMessageErrorConstant = {
    [keyValidationError.STRING_BASE]: 'Поле повинно вмістити букви',
    [keyValidationError.STRING_EMPTY]: 'поле не може бути пустим',
    [keyValidationError.STRING_MAX]: 'довжина повинна бути  не більше ніж {#limit}',
    [keyValidationError.STRING_MIN]: 'довжина повинна бути не меньше ніж {#limit}',
    [keyValidationError.STRING_PATTERN]: 'поле повинно містити Великі та малі літери',
    [keyValidationError.NUMBER_MAX]: 'максимальне число {#limit}',
    [keyValidationError.NUMBER_MIN]: 'мінімальне число {#limit}',
    [keyValidationError.NUMBER_BASE]: 'має бути числом',
    [keyValidationError.NUMBER_EMPTY]: 'поле  не може бути пустим',
    [keyValidationError.ANY_REQUIRED]: "поле є обов'язковим",
};