import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { HttpModule } from '@nestjs/axios';
import { LinkService } from '../link/link.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [RssController],
  providers: [RssService, LinkService],
})
export class RssModule {}
