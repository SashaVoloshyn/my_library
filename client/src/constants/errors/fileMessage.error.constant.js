import { fileFormatUtil, fileSizeUtil } from '../../utils';
import {fileTypeConstant} from "../files/fileType.constant";
import {fileSizeConstant} from "../files/fileSize.constant";

class FileMessageErrorConstant {
    errorAvatarFormatConstant() {
        return `Формат файла повинен бути${fileFormatUtil(fileTypeConstant.PHOTOS)}`;
    }

    errorAvatarSizeConstant() {
        return `розмір завеликий, повинен бути не більше ${fileSizeUtil(fileSizeConstant.SIZE_AVATAR)}Mb`;
    }
}

export const { errorAvatarFormatConstant, errorAvatarSizeConstant } = FileMessageErrorConstant;