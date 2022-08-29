import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheService } from 'src/cache/cache.service';

@Module({
  controllers: [PostController],
  providers: [PostService, CacheService],
  imports: [PrismaModule],
})
export class PostModule {}
