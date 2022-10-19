export interface GetMultipartUploadPresignedUrlDto {
  bucket?: string;
  key: string;
  uploadId: string;
  partNumber: number;
}
