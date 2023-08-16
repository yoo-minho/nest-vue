import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheService } from 'src/cache/cache.service';
import { LinkService } from 'src/link/link.service';
import { PostService } from 'src/post/post.service';
import { TagService } from 'src/tag/tag.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [
    GroupService,
    CacheService,
    LinkService,
    TagService,
    PostService,
    AuthService,
    JwtService,
  ],
  exports: [GroupService],
})
export class GroupModule {}
