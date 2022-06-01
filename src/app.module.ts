import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OpenGraphTagModule } from './open-graph-tag/open-graph-tag.module';
import { RssModule } from './rss/rss.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/dist'),
    }),
    OpenGraphTagModule,
    RssModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
