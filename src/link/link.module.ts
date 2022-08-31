import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkController } from './link.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LinkController],
  providers: [LinkService],
  imports: [PrismaModule],
})
export class LinkModule {}
