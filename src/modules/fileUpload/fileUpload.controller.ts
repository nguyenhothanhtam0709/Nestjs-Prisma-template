import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './DTO/fileUpload.dto';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  @Post('/upload')
  @ApiOperation({
    summary: 'Upload file',
    description: 'User upload file',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      url: file?.path || file['location'],
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
