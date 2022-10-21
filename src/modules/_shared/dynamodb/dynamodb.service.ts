import {
  DynamoDBClient,
  CreateTableCommand,
  CreateTableCommandInput,
  TableDescription,
  DeleteTableCommandInput,
  DeleteTableCommand,
} from '@aws-sdk/client-dynamodb';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DynamoDBService {
  private readonly ddbClient: DynamoDBClient;

  constructor(private readonly configService: ConfigService) {
    this.ddbClient = new DynamoDBClient({
      region: configService.get<string>(ENV_VAR_NAMES.DYNAMODB_REGION),
      credentials: {
        accessKeyId: configService.get<string>(
          ENV_VAR_NAMES.DYNAMODB_ACCESS_KEY_ID,
        ),
        secretAccessKey: configService.get<string>(
          ENV_VAR_NAMES.DYNAMODB_SECRET_ACCESS_KEY,
        ),
      },
    });
  }

  getDDBClient(): DynamoDBClient {
    return this.ddbClient;
  }

  async createTable(
    params: CreateTableCommandInput,
  ): Promise<TableDescription> {
    const command = new CreateTableCommand(params);
    const res = await this.ddbClient.send(command);
    return res.TableDescription;
  }

  async deleteTable(
    params: DeleteTableCommandInput,
  ): Promise<TableDescription> {
    const command = new DeleteTableCommand(params);
    const res = await this.ddbClient.send(command);
    return res.TableDescription;
  }
}
