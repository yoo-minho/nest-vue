import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LinkService } from '../link/link.service';

@Module({
  controllers: [PostController],
  providers: [PostService, LinkService],
  imports: [PrismaModule],
})
export class PostModule {}
