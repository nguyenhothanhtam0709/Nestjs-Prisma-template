import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { SCALAR_ATTRIBUTE_TYPE_ENUM } from '../enums/scalarAttributeType';
import { KEY_TYPE_ENUM } from '../enums/keyType';
import { DYNAMODB_TABLE_NAME } from '../enums/tableName';

export const createTableFoodDefination: CreateTableCommandInput = {
  TableName: DYNAMODB_TABLE_NAME.FOODS, //TABLE_NAME
  AttributeDefinitions: [
    {
      AttributeName: 'Region',
      AttributeType: SCALAR_ATTRIBUTE_TYPE_ENUM.N,
    },
    {
      AttributeName: 'Name',
      AttributeType: SCALAR_ATTRIBUTE_TYPE_ENUM.S,
    },
  ],
  KeySchema: [
    {
      AttributeName: 'Region',
      KeyType: KEY_TYPE_ENUM.HASH, // partition key
    },
    {
      AttributeName: 'Name',
      KeyType: KEY_TYPE_ENUM.RANGE, // sort key
    },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1,
  },
  StreamSpecification: {
    StreamEnabled: false,
  },
};
