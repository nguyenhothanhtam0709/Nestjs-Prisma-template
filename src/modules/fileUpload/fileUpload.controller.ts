import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileUploadDto } from './DTO/fileUpload.dto';
import { GetUploadFilePresignedUrl } from './DTO/getUploadPresignedUrl.dto';
import { FileUploadService } from './fileUpload.service';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

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

  @Get('upload-presigned-url')
  @ApiOperation({
    summary: 'Upload presigned url',
    description: 'Get S3 presigned url for upload file',
  })
  getUploadPresignedUrl(@Query() query: GetUploadFilePresignedUrl) {
    return this.fileUploadService.getUploadPresignedUrl(query);
  }
}
