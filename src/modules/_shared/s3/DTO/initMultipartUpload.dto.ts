export interface InitMultipartUploadDto {
  bucket?: string;
  key: string;
  ACL?: string;
  mimeType?: string | false;
}
