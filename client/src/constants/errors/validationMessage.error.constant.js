import {keyValidationError} from "./keyValidationError.constant";

export const validationMessageErrorConstant = {
    [keyValidationError.STRING_BASE]: '{{#label}} повинен вмістити букви',
    [keyValidationError.STRING_EMPTY]: '{{#label}} не може бути пустим',
    [keyValidationError.STRING_MAX]: '{{#label}} повинен мати довжину не більше ніж {#limit}',
    [keyValidationError.STRING_MIN]: '{{#label}} повинен мати довжину не менше {#limit}',
    [keyValidationError.STRING_PATTERN]: '{{#label}} повинен дотримуватись обов`язково регулярному виразу: {{#regex}}',
    [keyValidationError.NUMBER_MAX]: '{{#label}} максимальне число {#limit}',
    [keyValidationError.NUMBER_MIN]: '{{#label}} мінімальне число {#limit}',
    [keyValidationError.NUMBER_BASE]: '{{#label}} має бути числом',
    [keyValidationError.NUMBER_EMPTY]: '{{#label}} не може бути пустим',
    [keyValidationError.ANY_REQUIRED]: "{{#label}} є обов'язковим",
};