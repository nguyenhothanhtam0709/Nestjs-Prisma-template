import { ENV_VAR_NAMES } from '@commons/enums/env';
import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {
    super({
      datasources: {
        db: {
          url: configService.get<string>(ENV_VAR_NAMES.DATABASE_URL),
        },
      },
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    this.configureLogging();
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  private configureLogging() {
    this.bindInfoEvent();
    this.bindErrorEvent();
    this.bindQueryEvent();
  }

  private bindInfoEvent() {
    this.$on('info', (event: Prisma.LogEvent) => {
      this.logger.log(`Message: ${event.message}`, 'Prisma Info');
    });
  }

  private bindErrorEvent() {
    this.$on('error', (event: Prisma.LogEvent) => {
      this.logger.log(`Message: ${event.message}`, 'Prisma Error');
    });
  }

  private bindQueryEvent() {
    this.$on('query', (event: Prisma.QueryEvent) => {
      this.logger.log(
        `Query: ${event.query} - Params: ${event.params} - Duration: ${event.duration}`,
        'Prisma Query',
      );
    });
  }
}
