import { getCurentTimestampMs } from '@commons/utils/time';
import { S3Service } from '@modules/_shared/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { FinalizeMultipartUploadDto } from './DTO/finalizeMultipartUpload.dto';
import {
  GetMultipartSignedUrlDto,
  GetMultipartUploadSignedUrlDto,
  InitMultipartUploadDto,
} from './DTO/multipartUpload.dto';
import mime from 'mime-types';

@Injectable()
export class MultipartUploadService {
  constructor(private readonly s3Service: S3Service) {}

  async initMultipartUpload(data: InitMultipartUploadDto) {
    const key = `${getCurentTimestampMs()}-${data.key}`;
    const mimeType = mime.lookup(data.key);
    const initUploadData = await this.s3Service.initMultipartUpload({
      ...data,
      key,
      mimeType,
    });
    const { UploadId: fileId, Key: fileKey } = initUploadData;
    return { fileId, fileKey };
  }

  async getSignedUrl(data: GetMultipartSignedUrlDto) {
    const url = await this.s3Service.getMultipartUploadPresignedUrl({
      uploadId: data.fileId,
      key: data.fileKey,
      partNumber: data.partNumber,
    });
    return {
      partNumber: data.partNumber,
      signedUrl: url,
    };
  }

  async getMultipartUploadPresignedUrls(data: GetMultipartUploadSignedUrlDto) {
    const { parts } = data;

    const result = await Promise.all(
      Array.from({ length: parts }, async (v, k) => {
        const url = await this.s3Service.getMultipartUploadPresignedUrl({
          uploadId: data.fileId,
          key: data.fileKey,
          partNumber: k + 1,
        });
        return {
          partNumber: k + 1,
          signedUrl: url,
        };
      }),
    );

    return result;
  }

  async finalizeMultipartUpload(data: FinalizeMultipartUploadDto) {
    const result = await this.s3Service.finalizeMultipartUpload(data);

    return result;
  }
}
