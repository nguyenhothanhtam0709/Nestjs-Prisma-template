import { SqsModule } from '@modules/_shared/sqs/sqs.module';
import { Module } from '@nestjs/common';
import { SqsPublisherController } from './sqsPublisher.controller';
import { SqsPublisherService } from './sqsPublisher.service';

@Module({
  imports: [SqsModule],
  controllers: [SqsPublisherController],
  providers: [SqsPublisherService],
})
export class SqsPublisherModule {}
