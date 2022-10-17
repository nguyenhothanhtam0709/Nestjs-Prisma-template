import { registerConfigModule } from '@bootstrap';
import { LoggerModule } from '@modules/logger/logger.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from '@modules/post/post.module';
import { PrismaModule } from '@modules/prisma/prisma.module';

@Module({
  imports: [registerConfigModule(), LoggerModule, PrismaModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
