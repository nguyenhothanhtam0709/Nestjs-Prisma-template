import * as Transport from 'winston-transport';
import * as winston from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { ENV_VAR_NAMES } from '@commons/enums/env';
import { ConfigService } from '@nestjs/config';
import { BOOLEAN_STRING } from '@commons/enums/boolean';

export const configLogger = (
  configService: ConfigService,
  projectName: string,
) => {
  const transports: Transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
      level: process.env.LOG_LEVEL,
    }),
  ];

  if (
    configService
      .get<string>(ENV_VAR_NAMES.ENABLE_FILE_LOGGER)
      .toLowerCase() === BOOLEAN_STRING.TRUE
  ) {
    transports.push(
      new winston.transports.File({
        filename: `Log/${projectName}/log.log`,
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
        zippedArchive: true,
        maxFiles: 10 * 1024 * 1024, // 10MB
        level: process.env.LOG_LEVEL,
      }),
    );
  }

  return WinstonModule.createLogger({ transports });
};
