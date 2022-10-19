export interface GetPutObjectPregisnedUrlDto {
  bucket?: string;
  key: string;
  ACL?: string;

  /**
   * seconds
   */
  expiresIn?: number;
}
