import S3, { ManagedUpload } from 'aws-sdk/clients/s3';
import { v4 } from 'uuid';
import path from 'path';

import { mainConfig } from '../configs';
import { FileEnum, ItemTypeFileEnum } from '../enums';

class S3Service {
    Bucket;

    uuidv4;

    constructor() {
        this.Bucket = new S3({
            region: mainConfig.S3_REGION,
            accessKeyId: mainConfig.S3_ACCESS_KEY,
            secretAccessKey: mainConfig.S3_SECRET_KEY,
        });
        this.uuidv4 = v4;
    }

    public async uploadFile(file: Express.Multer.File, itemId: number, fileType: FileEnum, itemType: ItemTypeFileEnum)
        : Promise<ManagedUpload.SendData> {
        const { originalname, buffer, mimetype } = file;
        const itemIdToString = itemId.toString();

        const pathToFile = this._pathBuilder(originalname, itemIdToString, fileType, itemType);

        return this.Bucket.upload({
            Bucket: mainConfig.S3_NAME as string,
            Key: pathToFile,
            Body: buffer,
            ContentType: mimetype,
            ACL: 'public-read',
        })
            .promise();
    }

    private _pathBuilder(fileName: string, itemId: string, fileType: FileEnum, itemType: ItemTypeFileEnum): string {
        const fileExpansion = path.extname(fileName);
        const newFileName = this.uuidv4() + fileExpansion;

        return `${fileType}/${itemType}/${itemId}/${newFileName}`;
    }
}
export const s3Service = new S3Service();
