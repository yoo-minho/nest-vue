import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LinkService } from '../link/link.service';
import { GroupService } from 'src/group/group.service';

@Module({
  controllers: [PostController],
  providers: [PostService, LinkService, GroupService],
  imports: [PrismaModule],
})
export class PostModule {}
