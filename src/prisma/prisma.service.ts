import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';
import { jsonParse } from 'src/util';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async ({ query, params }) => {
      if (process.env.NODE_ENV === 'development') {
        console.info(
          `=== QUERY === \n${format(query, {
            language: 'postgresql',
            tabWidth: 2,
            linesBetweenQueries: 2,
          }).replace(/"public"./g, '')}`,
        );
        console.info('== PARAM', jsonParse(params));
      }
    });
    this.$use(async (params, next) => {
      const before = Date.now();
      // await new Promise((res) => setTimeout(res, 500));
      const result = await next(params);
      const after = Date.now();
      const { model, action } = params;
      if (process.env.NODE_ENV === 'development') {
        console.info(`== MODEL : ${model}.${action}`);
        console.info(`== TIMES : ${after - before}ms`);
        console.info(`==========================================`);
      }
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
