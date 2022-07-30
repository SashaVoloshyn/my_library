import { fileMimetypeConstant } from '../../constants';

export const fileFormatUtil = (fileType) => fileMimetypeConstant[fileType].join('/')
    .split('/').join(' ').replaceAll('image', '');