import { Module } from '@nestjs/common';
import { OpenGraphTagService } from './open-graph-tag.service';
import { OpenGraphTagController } from './open-graph-tag.controller';

@Module({
  controllers: [OpenGraphTagController],
  providers: [OpenGraphTagService]
})
export class OpenGraphTagModule {}
