import { UPLOAD_FILE_SIZE_LIMIT } from '@commons/const/fileUpload';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import {
  uploadFileFilter,
  uploadFilename,
} from '@commons/filters/audioFile.filter';
import { ConfigService } from '@nestjs/config';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { S3Module } from '@modules/s3/s3.module';
import { S3Service } from '@modules/s3/s3.service';

export const configMulterModule = () => {
  return MulterModule.registerAsync({
    imports: [S3Module],
    inject: [ConfigService, S3Service],
    useFactory: async (
      configService: ConfigService,
      s3Service: S3Service,
    ): Promise<MulterModuleOptions> => {
      const s3 = s3Service.getClient();

      const options: MulterModuleOptions = {
        storage: multerS3({
          s3: s3,
          bucket: configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
          key: uploadFilename,
        }),
        limits: {
          fileSize: UPLOAD_FILE_SIZE_LIMIT,
        },
        fileFilter: uploadFileFilter,
      };

      return options;
    },
  });
};
