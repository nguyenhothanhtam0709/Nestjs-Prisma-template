import { DEFAULT_GLOBAL_PREFIX, DEFAULT_API_PORT } from '@commons/const/env';
import { BOOLEAN_STRING } from '@commons/enums/boolean';
import { ENV_VAR_NAMES, NODE_ENV_ENUM } from '@commons/enums/env';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

const SecretManagerSchema = joi.object({
  SECRET_MANAGER_REGION: joi.string().required(),
  SECRET_MANAGER_ACCESS_KEY_ID: joi.string().required(),
  SECRET_MANAGER_SECRET_ACCESS_KEY: joi.string().required(),
  SECRET_MANAGER_ID: joi.string().required(),
});

const DotenvSchema = joi.object({
  [ENV_VAR_NAMES.NODE_ENV]: joi
    .string()
    .valid(
      NODE_ENV_ENUM.DEV,
      NODE_ENV_ENUM.TEST,
      NODE_ENV_ENUM.STAGING,
      NODE_ENV_ENUM.PROD,
    )
    .default(NODE_ENV_ENUM.DEV),
  [ENV_VAR_NAMES.API_PORT]: joi.number().default(DEFAULT_API_PORT),
  [ENV_VAR_NAMES.DATABASE_URL]: joi.string().required(),
  [ENV_VAR_NAMES.ENABLE_FILE_LOGGER]: joi
    .string()
    .valid(BOOLEAN_STRING.TRUE, BOOLEAN_STRING.FALSE)
    .default(BOOLEAN_STRING.FALSE),
  [ENV_VAR_NAMES.SERVER_PREFIX]: joi.string().optional(),
  [ENV_VAR_NAMES.GLOBAL_PREFIX]: joi.string().default(DEFAULT_GLOBAL_PREFIX),
  [ENV_VAR_NAMES.AWS_BUCKET_NAME]: joi.string().required(),
  [ENV_VAR_NAMES.AWS_BUCKET_REGION]: joi.string().required(),
  [ENV_VAR_NAMES.S3_ACCESS_KEY_ID]: joi.string().required(),
  [ENV_VAR_NAMES.S3_SECRET_ACCESS_KEY]: joi.string().required(),
  [ENV_VAR_NAMES.DYNAMODB_REGION]: joi.string().required(),
  [ENV_VAR_NAMES.DYNAMODB_ACCESS_KEY_ID]: joi.string().required(),
  [ENV_VAR_NAMES.DYNAMODB_SECRET_ACCESS_KEY]: joi.string().required(),
  [ENV_VAR_NAMES.SQS_QUEUE_URL]: joi.string().required(),
  [ENV_VAR_NAMES.SQS_REGION]: joi.string().required(),
  [ENV_VAR_NAMES.SQS_ACCESS_KEY_ID]: joi.string().required(),
  [ENV_VAR_NAMES.SQS_SECRET_ACCESS_KEY]: joi.string().required(),
});

export const registerConfigModule = () =>
  ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    load: [
      async () => {
        const secretManagerInfo = SecretManagerSchema.validate(process.env, {
          allowUnknown: true,
        });

        if (secretManagerInfo.error) {
          /**
           * get env from .env file
           */
          const dotenvInfo = DotenvSchema.validate(process.env, {
            allowUnknown: true,
          });
          if (dotenvInfo.error) {
            throw new Error(dotenvInfo.error.message);
          }

          return dotenvInfo.value;
        }

        /**
         * get env from secret manager
         */
        const client = new SecretsManagerClient({
          region: process.env.SECRET_MANAGER_REGION,
          credentials: {
            accessKeyId: process.env.SECRET_MANAGER_ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_MANAGER_SECRET_ACCESS_KEY,
          },
        });
        const command = new GetSecretValueCommand({
          SecretId: process.env.SECRET_MANAGER_ID,
        });
        const response = await client.send(command);
        const secretStr = response.SecretString;
        const value = DotenvSchema.validate(JSON.parse(secretStr), {
          allowUnknown: true,
        });
        if (value.error) {
          throw new Error(value.error.message);
        }

        return value.value;
      },
    ],
  });
