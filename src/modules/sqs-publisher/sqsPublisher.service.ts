import { ENV_VAR_NAMES } from '@commons/enums/env';
import { SqsService } from '@modules/_shared/sqs/sqs.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendMessageDto } from './DTO/sendMessage.dto';

@Injectable()
export class SqsPublisherService {
  constructor(
    private readonly sqsService: SqsService,
    private readonly configService: ConfigService,
  ) {}

  sendMessage(data: SendMessageDto) {
    const queueUrl = this.configService.get<string>(
      ENV_VAR_NAMES.SQS_QUEUE_URL,
    );

    return this.sqsService.send({
      QueueUrl: queueUrl,
      DelaySeconds: 10,
      ...data,
    });
  }
}
