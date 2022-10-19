import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinalizeMultipartUploadDto } from './DTO/finalizeMultipartUpload.dto';
import {
  GetMultipartSignedUrlDto,
  GetMultipartUploadSignedUrlDto,
  InitMultipartUploadDto,
} from './DTO/multipartUpload.dto';
import { MultipartUploadService } from './multipartUpload.service';

@ApiTags('Multipart Upload File')
@Controller('multipart-upload')
export class MultipartUploadController {
  constructor(
    private readonly multipartUploadService: MultipartUploadService,
  ) {}

  @Get('init')
  initMultipartUpload(@Query() query: InitMultipartUploadDto) {
    return this.multipartUploadService.initMultipartUpload(query);
  }

  @Get('signed-url')
  getSignedUrl(data: GetMultipartSignedUrlDto) {
    return this.multipartUploadService.getSignedUrl(data);
  }

  @Get('presigned-urls')
  getMultipartUploadPresignedUrls(
    @Query() query: GetMultipartUploadSignedUrlDto,
  ) {
    return this.multipartUploadService.getMultipartUploadPresignedUrls(query);
  }

  @Post('finalize')
  finalizeMultipartUpload(@Body() body: FinalizeMultipartUploadDto) {
    return this.multipartUploadService.finalizeMultipartUpload(body);
  }
}
