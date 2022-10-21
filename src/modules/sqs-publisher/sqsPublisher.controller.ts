import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from './DTO/sendMessage.dto';
import { SqsPublisherService } from './sqsPublisher.service';

@ApiTags('Sqs Publisher')
@Controller('sqs-publisher')
export class SqsPublisherController {
  constructor(private readonly sqsPublisherService: SqsPublisherService) {}

  @Post('send')
  send(@Body() body: SendMessageDto) {
    return this.sqsPublisherService.sendMessage(body);
  }
}
