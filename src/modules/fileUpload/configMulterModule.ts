import { S3Client } from '@aws-sdk/client-s3';
import { UPLOAD_FILE_SIZE_LIMIT } from '@commons/const/fileUpload';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import {
  uploadFileFilter,
  uploadFilename,
} from '@commons/filters/audioFile.filter';
import { ConfigService } from '@nestjs/config';
import { MulterModule, MulterModuleOptions } from '@nestjs/platform-express';
import * as multerS3 from 'multer-s3';
import { Request } from 'express';

export const configMulterModule = () => {
  return MulterModule.registerAsync({
    inject: [ConfigService],
    useFactory: async (
      configService: ConfigService,
    ): Promise<MulterModuleOptions> => {
      const s3 = new S3Client({
        region: configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_REGION),
        credentials: {
          accessKeyId: configService.get<string>(
            ENV_VAR_NAMES.S3_ACCESS_KEY_ID,
          ),
          secretAccessKey: configService.get<string>(
            ENV_VAR_NAMES.S3_SECRET_ACCESS_KEY,
          ),
        },
      });

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
