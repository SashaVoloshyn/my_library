import { FileEnum, FilesUploadFieldsEnum } from '../../enums';

export const filesMimetypeConstant = {
    [FileEnum.PHOTOS]: [
        'image/jpeg', // JPEG
        'image/pjpeg', // JPEG
        'image/png', //  PNG
        'image/webp', // WEBP
    ],
    [FileEnum.TEXTS]: [
        'text/plain', // TXT
        'application/pdf', // PDF
        'application/epub+zip', // EPUB
        'application/rtf', // RTF
    ],
    [FileEnum.AUDIOS]: [
        'audio/mp4', // MP4
        'audio/mpeg', // MP3 or MPEG
    ],
};

export const fileSizeConstant = {
    SIZE_DEFAULT: 1024 * 1024,
    SIZE_AVATAR: 2 * 1024 * 1024,
    SIZE_COVER: 4 * 1024 * 2024,
    SIZE_AUTHOR_PHOTO: 3 * 1024 * 1024,
    SIZE_BOOK_TEXT_FILE: 5 * 1024 * 1024,
    SIZE_AUDIO_BOOK: 10 * 1024 * 1024,
};

export const filesUploadFields = [
    { name: FilesUploadFieldsEnum.FILE_TEXT, maxCount: 1 },
    { name: FilesUploadFieldsEnum.COVER, maxCount: 1 },
    { name: FilesUploadFieldsEnum.FILE_AUDIO, maxCount: 1 },
];
