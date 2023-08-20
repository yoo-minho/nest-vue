import { Module } from '@nestjs/common';
import { RssService } from './rss.service';
import { RssController } from './rss.controller';
import { HttpModule } from '@nestjs/axios';
import { LinkService } from '../link/link.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupService } from 'src/group/group.service';
import { PostService } from 'src/post/post.service';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [RssController],
  providers: [RssService, LinkService, GroupService, PostService],
})
export class RssModule {}
