import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CacheService } from 'src/cache/cache.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, CacheService],
  imports: [PrismaModule],
})
export class GroupModule {}
