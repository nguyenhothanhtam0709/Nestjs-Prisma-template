import { getCurentTimestampMs } from '@commons/utils/time';
import { S3Service } from '@modules/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { GetUploadFilePresignedUrl } from './DTO/getUploadPresignedUrl.dto';
import mime from 'mime-types';

@Injectable()
export class FileUploadService {
  constructor(private readonly s3Service: S3Service) {}

  getUploadPresignedUrl(data: GetUploadFilePresignedUrl) {
    const key = `${getCurentTimestampMs()}-${data.key}`;
    const mimeType = mime.lookup(data.key);

    return this.s3Service.getPutObjectPresignedUrl({
      key,
      mimeType,
      expiresIn: 600,
    });
  }
}
