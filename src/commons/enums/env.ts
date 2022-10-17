export const ENV_VAR_NAMES = {
  NODE_ENV: 'NODE_ENV',

  // server
  API_PORT: 'API_PORT',
  SERVER_PREFIX: 'SERVER_PREFIX',
  GLOBAL_PREFIX: 'GLOBAL_PREFIX',

  // db
  DATABASE_URL: 'DATABASE_URL',

  // logging
  ENABLE_FILE_LOGGER: 'ENABLE_FILE_LOGGER',
};

export enum NODE_ENV_ENUM {
  DEV = 'dev',
  TEST = 'test',
  STAGING = 'staging',
  PROD = 'prod',
}
