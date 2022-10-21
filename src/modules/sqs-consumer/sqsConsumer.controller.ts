import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SqsConsumerService } from './sqsConsumer.service';

@ApiTags('Sqs Consumer')
@Controller('sqs-consumer')
export class SqsConsumerController {
  constructor(private readonly sqsConsumerService: SqsConsumerService) {}

  @Get('receive')
  receive() {
    return this.sqsConsumerService.receive();
  }
}
