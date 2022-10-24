import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';
import { jsonParse } from 'src/util';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
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
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.$on('query', async ({ query, params }) => {
      console.info('\n\n');
      console.info(
        `=== QUERY === \n${format(query, {
          language: 'postgresql',
          tabWidth: 2,
          linesBetweenQueries: 2,
        }).replace(/"public"./g, '')}`,
      );
      console.info('== PARAM', jsonParse(params));
    });
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      const { model, action } = params;
      console.info(`== MODEL : ${model}.${action}`);
      console.info(`== TIMES : ${after - before}ms`);
      console.info(`==========================================`);
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
