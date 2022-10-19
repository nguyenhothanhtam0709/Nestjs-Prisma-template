import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DEFAULT_PRESIGNED_URL_EXPIRE } from '@commons/const/s3';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { S3_ACL_ENUM } from '@commons/enums/s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetPutObjectPregisnedUrlDto } from './DTO/getPutObjectPresignedUrl.dto';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3Client({
      region: configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_REGION),
      credentials: {
        accessKeyId: configService.get<string>(ENV_VAR_NAMES.S3_ACCESS_KEY_ID),
        secretAccessKey: configService.get<string>(
          ENV_VAR_NAMES.S3_SECRET_ACCESS_KEY,
        ),
      },
    });
  }

  getClient(): S3Client {
    return this.s3;
  }

  async getPutObjectPresignedUrl(data: GetPutObjectPregisnedUrlDto) {
    const command = new PutObjectCommand({
      Bucket:
        data?.bucket ||
        this.configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
      ACL: data?.ACL || S3_ACL_ENUM.PUBLIC_READ,
      Key: data.key,
    });
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: data?.expiresIn || DEFAULT_PRESIGNED_URL_EXPIRE,
    });

    return url;
  }
}
