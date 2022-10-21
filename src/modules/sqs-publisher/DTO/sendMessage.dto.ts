import { MessageAttributeValue } from '@aws-sdk/client-sqs';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
} from 'class-validator';

export class SendMessageDto {
  @ApiProperty({
    required: true,
    example:
      'Information about current NY Times fiction bestseller for week of 12/11/2016.',
  })
  @IsNotEmpty()
  MessageBody: string;

  @ApiProperty({
    required: false,
    example: {
      Title: {
        DataType: 'String',
        StringValue: 'The Whistler',
      },
      Author: {
        DataType: 'String',
        StringValue: 'John Grisham',
      },
      WeeksOn: {
        DataType: 'Number',
        StringValue: '6',
      },
    },
  })
  @IsNotEmpty()
  @IsObject()
  @IsNotEmptyObject()
  MessageAttributes: Record<string, MessageAttributeValue>;
}
