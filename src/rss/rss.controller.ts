import { Controller, Get, Query } from '@nestjs/common';
import { RssQueryDto } from './dto/rss-query.dto';
import { RssService } from './rss.service';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Get()
  findOne(@Query() queryDto: RssQueryDto) {
    const { url, scrapAt } = queryDto;
    return this.rssService.findOne(url, scrapAt);
  }
}
