import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OpenGraphTagModule } from './open-graph-tag/open-graph-tag.module';
import { RssModule } from './rss/rss.module';
import { GroupModule } from './group/group.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';
import { PostModule } from './post/post.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    OpenGraphTagModule,
    RssModule,
    GroupModule,
    PostModule,
    CacheModule.register({ isGlobal: true }),
    LinkModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
