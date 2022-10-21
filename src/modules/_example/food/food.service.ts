import { DynamoDBDocumentService } from '@modules/_shared/dynamodb/dynamodbDocumentService';
import { Injectable } from '@nestjs/common';
import { DYNAMODB_TABLE_NAME } from 'src/dynamodb/enums/tableName';
import { CreateFoodDto } from './DTO/createFood.dto';
import { GetFoodDto } from './DTO/getFood.dto';
import { QueryFoodDto } from './DTO/queryFood.dto';
import { UpdateFoodDto } from './DTO/updateFood.dto';

@Injectable()
export class FoodService {
  constructor(private readonly ddbDocService: DynamoDBDocumentService) {}

  create(data: CreateFoodDto) {
    return this.ddbDocService.insert({
      TableName: DYNAMODB_TABLE_NAME.FOODS,
      Item: { ...data },
    });
  }

  async getByKey(data: GetFoodDto) {
    return this.ddbDocService.get({
      TableName: DYNAMODB_TABLE_NAME.FOODS,
      Key: {
        Region: data.Region,
        Name: data.Name,
      },
    });
  }

  get(input: QueryFoodDto) {
    const query = Object.entries(input).reduce(
      (prev, [key, value]: [string, any], index: number) => {
        prev.KeyConditionExpression.push(`#${key} = :v${index}`);
        prev.ExpressionAttributeNames[`#${key}`] = key;
        prev.ExpressionAttributeValues[`:v${index}`] = value;
        return prev;
      },
      {
        KeyConditionExpression: [],
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
      },
    );

    const params = {
      TableName: DYNAMODB_TABLE_NAME.FOODS,
      ...query,
      KeyConditionExpression: query.KeyConditionExpression.join(' and '),
    };

    return this.ddbDocService.query(params);
  }

  delete(key: GetFoodDto) {
    return this.ddbDocService.delete({
      TableName: DYNAMODB_TABLE_NAME.FOODS,
      Key: {
        Region: key.Region,
        Name: key.Name,
      },
    });
  }

  update(key: GetFoodDto, data: UpdateFoodDto) {
    const build = Object.entries(data).reduce(
      (prev, [key, value]: [string, any], index: number) => {
        prev.UpdateExpression.push(`#${key}  = :v${index}`);
        prev.ExpressionAttributeValues[`:v${index}`] = value;
        prev.ExpressionAttributeNames[`#${key}`] = key;
        return prev;
      },
      {
        UpdateExpression: [],
        ExpressionAttributeValues: {},
        ExpressionAttributeNames: {},
      },
    );

    const query = {
      TableName: DYNAMODB_TABLE_NAME.FOODS,
      Key: { ...key },
      ...build,
      UpdateExpression: `set ${build.UpdateExpression.join(', ')}`,
    };

    return this.ddbDocService.update(query);
  }
}
