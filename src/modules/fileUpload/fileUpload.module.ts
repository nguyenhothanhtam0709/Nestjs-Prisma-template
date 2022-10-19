import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { configMulterModule } from './configMulterModule';
import { S3Module } from '@modules/s3/s3.module';
import { FileUploadService } from './fileUpload.service';
import { MultipartUploadService } from './multipartUpload.service';
import { MultipartUploadController } from './multipartUpload.controller';

@Module({
  imports: [S3Module, configMulterModule()],
  controllers: [FileUploadController, MultipartUploadController],
  providers: [FileUploadService, MultipartUploadService],
})
export class FileUploadModule {}
