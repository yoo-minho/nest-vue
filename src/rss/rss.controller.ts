import { Body, Controller, Post } from '@nestjs/common';
import { RssService } from './rss.service';

@Controller('rss')
export class RssController {
  constructor(private readonly rssService: RssService) {}

  @Post()
  async findOne(@Body() queryDto: any) {
    const { url, lastPostCreatedAt } = queryDto;
    return await this.rssService.findOne(url, lastPostCreatedAt);
  }
}
