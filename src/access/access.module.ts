import { Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AccessService],
})
export class AccessModule {}
