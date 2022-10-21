import { Injectable } from '@nestjs/common';
import {
  DeleteCommand,
  DeleteCommandInput,
  DeleteCommandOutput,
  DynamoDBDocumentClient,
  ExecuteStatementCommandInput,
  ExecuteStatementCommandOutput,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommandOutput,
  QueryCommandOutput,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateCommand,
  UpdateCommandInput,
  UpdateCommandOutput,
  PutCommand,
  PutCommandInput,
  QueryCommand,
  QueryCommandInput,
  BatchExecuteStatementCommandInput,
  BatchExecuteStatementCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBService } from './dynamodb.service';
import { translateConfig } from './options';
import {
  BatchExecuteStatementCommand,
  ExecuteStatementCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDBDocumentService {
  private readonly ddbDocClient: DynamoDBDocumentClient;

  constructor(private readonly dynamodbService: DynamoDBService) {
    this.ddbDocClient = DynamoDBDocumentClient.from(
      this.dynamodbService.getDDBClient(),
      translateConfig,
    );
  }

  async insert(params: PutCommandInput): Promise<PutCommandOutput> {
    const command = new PutCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async get(params: GetCommandInput): Promise<GetCommandOutput> {
    const command = new GetCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async query(params: QueryCommandInput): Promise<QueryCommandOutput> {
    const command = new QueryCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async delete(params: DeleteCommandInput): Promise<DeleteCommandOutput> {
    const command = new DeleteCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async update(params: UpdateCommandInput): Promise<UpdateCommandOutput> {
    const command = new UpdateCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async scan(params: ScanCommandInput): Promise<ScanCommandOutput> {
    const command = new ScanCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async partiQL(
    params: ExecuteStatementCommandInput,
  ): Promise<ExecuteStatementCommandOutput> {
    const command = new ExecuteStatementCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }

  async batchPartiQL(
    params: BatchExecuteStatementCommandInput,
  ): Promise<BatchExecuteStatementCommandOutput> {
    const command = new BatchExecuteStatementCommand(params);
    const data = await this.ddbDocClient.send(command);
    return data;
  }
}
