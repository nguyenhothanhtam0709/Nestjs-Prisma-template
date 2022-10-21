import { Module } from '@nestjs/common';
import { DynamoDBService } from './dynamodb.service';
import { DynamoDBDocumentService } from './dynamodbDocumentService';

@Module({
  providers: [DynamoDBService, DynamoDBDocumentService],
  exports: [DynamoDBService, DynamoDBDocumentService],
})
export class DynamoDBModule {}
