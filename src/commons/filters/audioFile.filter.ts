import { UPLOAD_FILE_EXTNAME } from '@commons/const/fileUpload';
import { getCurentTimestampMs } from '@commons/utils/time';
import { UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';

export const uploadFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.mimetype.match(UPLOAD_FILE_EXTNAME)) {
    return cb(new UnsupportedMediaTypeException(), false);
  }
  return cb(null, true);
};

export const uploadFilename = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error | null, filename: string) => void,
) => {
  const random = getCurentTimestampMs();
  const name = `${random}-${file.originalname}`;
  return cb(null, name);
};
