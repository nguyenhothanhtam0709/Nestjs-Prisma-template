export const UPLOAD_FILE_SIZE_LIMIT = 10485760; //10mb

const IMAGE_FILE_EXTNAME = /(jpg|jpeg|png|gif|bmp|tif|tiff)/;
const AUDIO_FILE_EXTNAME = /(mpeg|x-m4a)/;
const VIDEO_FILE_NAME = /(mp4|mkv|mov|avi)/;

export const UPLOAD_FILE_EXTNAME = new RegExp(
  `(${IMAGE_FILE_EXTNAME.source}|${AUDIO_FILE_EXTNAME.source}|${VIDEO_FILE_NAME.source})$`,
  'isu',
);
