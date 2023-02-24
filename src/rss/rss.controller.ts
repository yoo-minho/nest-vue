import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from 'src/link/link.service';
import { RssService } from './rss.service';

@Controller('rss')
export class RssController {
  constructor(
    private readonly rssService: RssService,
    private readonly linkService: LinkService,
  ) {}

  @Post()
  async findOne(@Body() queryDto: any) {
    const { linkId, url, lastPostCreatedAt } = queryDto;
    this.linkService.updateScrapAt(linkId);
    return await this.rssService.findOne(url, lastPostCreatedAt);
  }
}
