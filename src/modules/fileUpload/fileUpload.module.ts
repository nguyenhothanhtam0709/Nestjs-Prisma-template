import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { configMulterModule } from './configMulterModule';
import { S3Module } from '@modules/s3/s3.module';
import { FileUploadService } from './fileUpload.service';

@Module({
  imports: [S3Module, configMulterModule()],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class FileUploadModule {}
