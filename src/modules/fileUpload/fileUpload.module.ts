import { Module } from '@nestjs/common';
import { FileUploadController } from './fileUpload.controller';
import { configMulterModule } from './configMulterModule';

@Module({
  imports: [configMulterModule()],
  controllers: [FileUploadController],
})
export class FileUploadModule {}
