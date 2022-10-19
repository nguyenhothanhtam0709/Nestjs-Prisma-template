import { registerConfigModule } from '@bootstrap';
import { LoggerModule } from '@modules/logger/logger.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '@modules/post/post.module';
import { PrismaModule } from '@modules/prisma/prisma.module';
import { CategoryModule } from '@modules/category/category.module';
import { FileUploadModule } from '@modules/fileUpload/fileUpload.module';
import { S3Module } from '@modules/s3/s3.module';

@Module({
  imports: [
    registerConfigModule(),
    LoggerModule,
    PrismaModule,
    PostModule,
    CategoryModule,
    FileUploadModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
