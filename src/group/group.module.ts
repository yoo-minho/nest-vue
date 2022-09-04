import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheService } from 'src/cache/cache.service';
import { LinkService } from 'src/link/link.service';
import { PostService } from 'src/post/post.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, CacheService, LinkService, PostService],
  imports: [PrismaModule],
})
export class GroupModule {}
