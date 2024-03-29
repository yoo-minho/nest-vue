import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exception.filter';

import { PostModule } from './post/post.module';
import { LinkModule } from './link/link.module';
import { RssModule } from './rss/rss.module';
import { GroupModule } from './group/group.module';
import { OpenGraphTagModule } from './open-graph-tag/open-graph-tag.module';
import { TagModule } from './tag/tag.module';
import Joi from 'joi';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { AccessModule } from './access/access.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${__dirname}/../config/${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
      renderPath: '/',
      serveStaticOptions: {
        cacheControl: false, //default:true
        etag: false, //default:true
        lastModified: false, //default:true
      },
    }),
    OpenGraphTagModule,
    RssModule,
    GroupModule,
    PostModule,
    CacheModule.register({ isGlobal: true }),
    LinkModule,
    TagModule,
    PrismaModule,
    UserModule,
    AuthModule,
    AccessModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
