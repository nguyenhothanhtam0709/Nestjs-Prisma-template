import { Injectable } from '@nestjs/common';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { DynamoDBService } from './dynamodb.service';
import { translateConfig } from './options';
import {
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDBDocumentService {
  private readonly ddbDocClient: DynamoDBDocumentClient;

  constructor(private readonly dynamodbService: DynamoDBService) {
    this.ddbDocClient = DynamoDBDocumentClient.from(
      this.dynamodbService.getDDBClient(),
      translateConfig,
    );
  }

  async insert(params: PutCommandInput) {
    const command = new PutCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async query(params: QueryCommandInput) {
    const command = new QueryCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }
}
