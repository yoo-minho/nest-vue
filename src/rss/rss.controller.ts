import { Body, Controller, Get, Post, Query } from '@nestjs/common';
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
    const { linkId, url, lastPostCreatedAt } = queryDto;
    const res = await this.rssService.findOne(url, lastPostCreatedAt);
    await this.linkService.updateFlag(linkId, res.lastPostCreateAt);
    return res;
  }
}
