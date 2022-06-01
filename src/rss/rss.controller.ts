import { Controller, Get, Query } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get(':id')
  findOne(@Query('url') url: string) {
    return this.rssService.findOne(url);
  }
}
