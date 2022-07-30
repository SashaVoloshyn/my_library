import {fileTypeConstant} from "./fileType.constant";

export const fileMimetypeConstant = {
    [fileTypeConstant.PHOTOS]: [
        'image/jpeg', // JPEG
        'image/pjpeg', // JPEG
        'image/png', //  PNG
        'image/webp', // WEBP
    ],
    [fileTypeConstant.APPLICATION]: [
        'application/pdf', // PDF
        'application/epub+zip', // EPUB
        'application/rtf', // RTF
    ],
    [fileTypeConstant.TEXTS]: [
        'text/plain', // TXT
    ],
    [fileTypeConstant.AUDIOS]: [
        'audio/mp4', // MP4
        'audio/mpeg', // MP3 or MPEG
    ],
};