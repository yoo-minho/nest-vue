import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GroupService } from '../group/group.service';

@Module({
  controllers: [PostController],
  providers: [PostService, GroupService],
  imports: [PrismaModule],
})
export class PostModule {}
