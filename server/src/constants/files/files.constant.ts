import { FileEnum } from '../../enums';

export const filesMimetypeConstant = {
    [FileEnum.PHOTOS]: [
        'image/jpeg', // JPEG
        'image/pjpeg', // JPEG
        'image/png', //  PNG
        'image/webp', // WEBP
    ],
    [FileEnum.APPLICATION]: [
        'application/pdf', // PDF
        'application/epub+zip', // EPUB
        'application/rtf', // RTF
    ],
    [FileEnum.TEXTS]: [
        'text/plain', // TXT
    ],
    [FileEnum.AUDIOS]: [
        'audio/mp4', // MP4
        'audio/mpeg', // MP3 or MPEG
    ],
};

export const fileSizeConstant = {
    SIZE_AVATAR: 2 * 1024 * 1024,
    SIZE_COVER: 4 * 1024 * 2024,
    SIZE_AUTHOR_PHOTO: 3 * 1024 * 1024,
};