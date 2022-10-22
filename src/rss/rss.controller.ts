import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RssQueryDto } from './dto/rss-query.dto';
import { RssService } from './rss.service';
import { LinkService } from '../link/link.service';

@Controller('rss')
export class RssController {
  constructor(
    private readonly rssService: RssService,
    private readonly linkService: LinkService,
  ) {}

  @Post()
  async findOne(@Body() queryDto: any) {
    const { linkId, url, scrapAt } = queryDto;
    const res = await this.rssService.findOne(url, scrapAt);
    this.linkService.updateFlag(linkId, res.lastPostCreateAt);
    return res;
  }
}
