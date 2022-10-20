export interface GetPutObjectPregisnedUrlDto {
  bucket?: string;
  key: string;
  ACL?: string;
  mimeType?: string | false;

  /**
   * seconds
   */
  expiresIn?: number;
}
