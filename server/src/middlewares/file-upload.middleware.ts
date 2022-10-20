import multer from 'multer';

import { IRequest } from '../interfaces';
import { errorMessageConstants, filesMimetypeConstant, fileSizeConstant } from '../constants';
import {
    FileEnum, FilesUploadFieldsEnum, HttpMessageEnum, HttpStatusEnum,
} from '../enums';
import { ErrorHandler } from '../errors';

class FileUploadMiddleware {
    public static userAvatar(): multer.Multer {
        return multer({
            limits: { fileSize: fileSizeConstant.SIZE_AVATAR },
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (!filesMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(
                        new ErrorHandler(
                            errorMessageConstants.fileMimetype,
                            HttpStatusEnum.BAD_REQUEST,
                            HttpMessageEnum.BAD_REQUEST,
                        ),
                    );
                }
                callback(null, true);
            },
        });
    }

    public static authorPhoto(): multer.Multer {
        return multer({
            limits: { fileSize: fileSizeConstant.SIZE_AUTHOR_PHOTO },
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (!filesMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                    return callback(
                        new ErrorHandler(
                            errorMessageConstants.fileMimetype,
                            HttpStatusEnum.BAD_REQUEST,
                            HttpMessageEnum.BAD_REQUEST,
                        ),
                    );
                }
                callback(null, true);
            },
        });
    }

    public static bookTextAudioCoverFields(): multer.Multer {
        return multer({
            fileFilter(_: IRequest, file: Express.Multer.File, callback: multer.FileFilterCallback) {
                if (file.fieldname === FilesUploadFieldsEnum.FILE_TEXT) {
                    if (!filesMimetypeConstant[FileEnum.TEXTS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(
                                errorMessageConstants.fileMimetype,
                                HttpStatusEnum.BAD_REQUEST,
                                HttpMessageEnum.BAD_REQUEST,
                            ),
                        );
                    }
                }

                if (file.fieldname === FilesUploadFieldsEnum.COVER) {
                    if (!filesMimetypeConstant[FileEnum.PHOTOS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(
                                errorMessageConstants.fileMimetype,
                                HttpStatusEnum.BAD_REQUEST,
                                HttpMessageEnum.BAD_REQUEST,
                            ),
                        );
                    }
                }

                if (file.fieldname === FilesUploadFieldsEnum.FILE_AUDIO) {
                    if (!filesMimetypeConstant[FileEnum.AUDIOS].includes(file.mimetype)) {
                        return callback(
                            new ErrorHandler(
                                errorMessageConstants.fileMimetype,
                                HttpStatusEnum.BAD_REQUEST,
                                HttpMessageEnum.BAD_REQUEST,
                            ),
                        );
                    }
                }
                callback(null, true);
            },
        });
    }
}
export const { userAvatar, authorPhoto, bookTextAudioCoverFields } = FileUploadMiddleware;
