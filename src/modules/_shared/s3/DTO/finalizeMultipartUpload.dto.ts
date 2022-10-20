interface PartDto {
  PartNumber: number;
  ETag: string;
}

export interface FinalizeMultipartUploadDto {
  fileKey: string;
  fileId: string;
  parts: Array<PartDto>;
  bucket?: string;
}
