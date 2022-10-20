import { CreateTableCommandInput } from '@aws-sdk/client-dynamodb';
import { SCALAR_ATTRIBUTE_TYPE_ENUM } from '../enums/scalarAttributeType';
import { KEY_TYPE_ENUM } from '../enums/keyType';

export const createTableFoodDefination: CreateTableCommandInput = {
  TableName: 'Foods', //TABLE_NAME
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
      KeyType: KEY_TYPE_ENUM.HASH,
    },
    {
      AttributeName: 'Name',
      KeyType: KEY_TYPE_ENUM.RANGE,
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
