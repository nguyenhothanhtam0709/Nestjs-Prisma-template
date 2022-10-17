import { ENV_VAR_NAMES, NODE_ENV_ENUM } from '@commons/enums/env';
import { CustomExceptionFilter } from '@commons/filters';
import { ResultFormatInterceptor } from '@commons/interceptors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { customExceptionFactory } from './bootstrap/exception';
import { configLogger } from './bootstrap/logger';
import { setupSwagger } from './bootstrap/swagger';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  app.useLogger(configLogger(configService, 'backend'));
  app.flushLogs();

  // app.use(helmet());
  app.enableCors();

  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new ResultFormatInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: customExceptionFactory,
    }),
  );

  const serverPrefix = configService.get<string>(ENV_VAR_NAMES.SERVER_PREFIX);
  const globalPrefix = configService.get<string>(ENV_VAR_NAMES.GLOBAL_PREFIX);
  const prefix = serverPrefix
    ? `${serverPrefix}/${globalPrefix}`
    : globalPrefix;
  app.setGlobalPrefix(prefix);
  setupSwagger(app);

  const logger = app.get(Logger);
  if (configService.get<string>(ENV_VAR_NAMES.NODE_ENV) === NODE_ENV_ENUM.DEV) {
    app.use(
      morgan('dev', {
        stream: {
          write: (message) => logger.log(message.trim()),
        },
      }),
    );
  }

  const port = configService.get<number>(ENV_VAR_NAMES.API_PORT);
  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`);
  });
}
bootstrap();
