import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SQSClient,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  DeleteMessageCommand,
  DeleteMessageCommandInput,
  DeleteMessageCommandOutput,
} from '@aws-sdk/client-sqs';
import { ENV_VAR_NAMES } from '@commons/enums/env';

@Injectable()
export class SqsService {
  private readonly sqs: SQSClient;

  constructor(private readonly configService: ConfigService) {
    this.sqs = new SQSClient({
      region: configService.get<string>(ENV_VAR_NAMES.SQS_REGION),
      credentials: {
        accessKeyId: configService.get<string>(ENV_VAR_NAMES.SQS_ACCESS_KEY_ID),
        secretAccessKey: configService.get<string>(
          ENV_VAR_NAMES.SQS_SECRET_ACCESS_KEY,
        ),
      },
    });
  }

  async send(
    params: SendMessageCommandInput,
  ): Promise<SendMessageCommandOutput> {
    const command = new SendMessageCommand(params);
    const result = await this.sqs.send(command);
    return result;
  }

  async receive(params: ReceiveMessageCommandInput) {
    const command = new ReceiveMessageCommand(params);
    const result = await this.sqs.send(command);
    return result;
  }

  async delete(
    params: DeleteMessageCommandInput,
  ): Promise<DeleteMessageCommandOutput> {
    const command = new DeleteMessageCommand(params);
    const result = await this.sqs.send(command);
    return result;
  }
}
