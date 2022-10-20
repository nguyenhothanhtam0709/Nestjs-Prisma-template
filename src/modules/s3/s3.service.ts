import {
  S3Client,
  PutObjectCommand,
  CreateMultipartUploadCommand,
  CreateMultipartUploadCommandInput,
  CreateMultipartUploadCommandOutput,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { DEFAULT_PRESIGNED_URL_EXPIRE } from '@commons/const/s3';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { S3_ACL_ENUM } from '@commons/enums/s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FinalizeMultipartUploadDto } from './DTO/finalizeMultipartUpload.dto';
import { GetMultipartUploadPresignedUrlDto } from './DTO/getMultipartUploadPresignedUrl.dto';
import { GetPutObjectPregisnedUrlDto } from './DTO/getPutObjectPresignedUrl.dto';
import { InitMultipartUploadDto } from './DTO/initMultipartUpload.dto';
import orderBy from 'lodash.orderby';

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
    const input: PutObjectCommandInput = {
      Bucket:
        data?.bucket ||
        this.configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
      ACL: data?.ACL || S3_ACL_ENUM.PUBLIC_READ,
      Key: data.key,
      ...(data?.mimeType ? { ContentType: data.mimeType } : {}),
    };
    const command = new PutObjectCommand(input);
    const url = await getSignedUrl(this.s3, command, {
      expiresIn: data?.expiresIn || DEFAULT_PRESIGNED_URL_EXPIRE,
    });

    return url;
  }

  async initMultipartUpload(data: InitMultipartUploadDto) {
    const input: CreateMultipartUploadCommandInput = {
      Bucket:
        data?.bucket ||
        this.configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
      ACL: data?.ACL || S3_ACL_ENUM.PUBLIC_READ,
      Key: data.key,
      ...(data?.mimeType ? { ContentType: data.mimeType } : {}),
    };
    const command = new CreateMultipartUploadCommand(input);

    const result = await this.s3.send<
      CreateMultipartUploadCommandInput,
      CreateMultipartUploadCommandOutput
    >(command);
    return result;
  }

  async getMultipartUploadPresignedUrl(
    data: GetMultipartUploadPresignedUrlDto,
  ) {
    const {
      bucket = this.configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
      key,
      uploadId,
      partNumber,
    } = data;

    const command = new UploadPartCommand({
      Bucket: bucket,
      Key: key,
      UploadId: uploadId,
      PartNumber: partNumber,
    });

    const url = await getSignedUrl(this.s3, command, {
      expiresIn: 1200,
    });
    return url;
  }

  async finalizeMultipartUpload(data: FinalizeMultipartUploadDto) {
    const {
      bucket = this.configService.get<string>(ENV_VAR_NAMES.AWS_BUCKET_NAME),
      fileKey,
      fileId,
      parts: _parts,
    } = data;

    const parts = orderBy(_parts, ['PartNumber'], ['asc']);

    const command = new CompleteMultipartUploadCommand({
      Bucket: bucket,
      Key: fileKey,
      UploadId: fileId,
      MultipartUpload: {
        Parts: parts,
      },
    });

    const result = await this.s3.send(command);
    return result;
  }
}
