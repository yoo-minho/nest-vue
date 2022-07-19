import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [GroupController],
  providers: [PrismaService, GroupService],
})
export class GroupModule {}
