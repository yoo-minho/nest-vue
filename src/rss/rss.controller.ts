import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from 'src/link/link.service';
import { RssService } from './rss.service';
import { PostService } from 'src/post/post.service';
import { GroupService } from 'src/group/group.service';

@Controller('rss')
export class RssController {
  constructor(
    private readonly rssService: RssService,
    private readonly linkService: LinkService,
    private readonly postService: PostService,
    private readonly groupService: GroupService,
  ) {}

  @Post()
  async findOne(@Body() queryDto: any) {
    const { linkId, url, lastPostCreatedAt } = queryDto;
    this.linkService.updateScrapAt(linkId);
    return await this.rssService.findOne(url, lastPostCreatedAt);
  }

  @Post('post')
  async scrap(
    @Body() queryDto: { linkId: number; url: string; lastPostCreatedAt: Date },
  ) {
    const { linkId, url, lastPostCreatedAt } = queryDto;
    this.linkService.updateScrapAt(linkId);
    const rssItems = await this.rssService.findConvertOne(url);
    const validPeriod = ({ createdAt }) => {
      let valid = true;
      if (lastPostCreatedAt) valid = valid && createdAt > lastPostCreatedAt;
      return valid && createdAt < new Date();
    };
    const items = rssItems.filter(validPeriod).map((v) => ({ ...v, linkId }));
    if (items.length === 0) return;
    const response = await this.postService.createPosts(items);
    await this.groupService.updateLastPostCreatedAtByLinkId(linkId);
    await this.groupService.updateWeeklyAvgPostByLinkId(linkId);
    return response;
  }
}
