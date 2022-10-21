import { ENV_VAR_NAMES } from '@commons/enums/env';
import { SqsService } from '@modules/_shared/sqs/sqs.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SqsConsumerService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  async receive() {
    const queueUrl = this.configService.get<string>(
      ENV_VAR_NAMES.SQS_QUEUE_URL,
    );
    const result = await this.sqsService.receive({
      QueueUrl: queueUrl,
      WaitTimeSeconds: 20,
      MaxNumberOfMessages: 10,
    });

    this.sqsService.delete({
      QueueUrl: queueUrl,
      ReceiptHandle: result.Messages[0]?.ReceiptHandle,
    });
    return result;
  }
}
