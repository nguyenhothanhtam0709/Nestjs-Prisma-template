import { SqsModule } from '@modules/_shared/sqs/sqs.module';
import { Module } from '@nestjs/common';
import { SqsConsumerController } from './sqsConsumer.controller';
import { SqsConsumerService } from './sqsConsumer.service';

@Module({
  imports: [SqsModule],
  controllers: [SqsConsumerController],
  providers: [SqsConsumerService],
})
export class SqsConsumerModule {}
