import { Controller, Get, Query } from '@nestjs/common';
import { OpenGraphTagService } from './open-graph-tag.service';

@Controller('open-graph-tag')
export class OpenGraphTagController {
  constructor(private readonly openGraphTagService: OpenGraphTagService) {}

  @Get()
  async get(@Query('url') url: string) {
    return this.openGraphTagService.getOne(url);
  }
}
