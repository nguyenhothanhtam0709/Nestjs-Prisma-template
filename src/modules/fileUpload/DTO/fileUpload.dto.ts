import { ApiProperty } from '@nestjs/swagger';

export class FileUploadDto {
  // @ApiProperty({ type: 'string', required: true, format: 'binary' })
  @ApiProperty({
    description: 'File',
    type: 'file',
    properties: {
      voice: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  file: Express.Multer.File;
}
