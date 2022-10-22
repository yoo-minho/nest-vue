import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ConflictException,
  Ip,
  Patch,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/cache/cache.service';
import { LinkService } from 'src/link/link.service';
import { PostService } from 'src/post/post.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly cacheService: CacheService,
    private readonly linkService: LinkService,
    private readonly postService: PostService,
  ) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const { domain, title, description, tags, links } = createGroupDto;
    const groupData = await this.groupService.group(domain);
    if (groupData !== null) {
      throw new ConflictException('중복된 도메인이 존재합니다!');
    }
    return this.groupService.createGroup({
      domain,
      title,
      description,
      creater: {
        connect: { id: 'dellose@naver.com' },
      },
      published: true, //TO-DO. 개발 true, 운영 false
      tags: {
        create: tags?.map((name) => ({
          tag: { connectOrCreate: { where: { name }, create: { name } } },
        })),
      },
      links: {
        create: links?.map((link) => ({
          link: {
            connectOrCreate: { where: { url: link.url }, create: { ...link } },
          },
        })),
      },
    });
  }

  @Get()
  findAll(@Query() { tag }) {
    const tagOption = tag
      ? {
          tags: { some: { tag: { name: tag } } },
        }
      : {};
    return this.groupService.groups({
      where: { published: true, ...tagOption },
      orderBy: { lastPostCreatedAt: 'desc' },
    });
  }

  @Get('tags')
  findAllTag() {
    return this.groupService.groupTags();
  }

  @Get('counts')
  async countGroupNLinkNPost() {
    const [groupCount, linkCount, postCount] = await Promise.all([
      this.groupService.count(),
      this.linkService.count(),
      this.postService.count(),
    ]);
    return { groupCount, linkCount, postCount };
  }

  @Get(':domain')
  async findOne(@Param('domain') domain: string, @Ip() ip: string) {
    if (await this.cacheService.isUpdatableViewsByGroupDomain(domain, ip)) {
      await this.groupService.upsertDailyViews(domain);
      await this.groupService.updateTotalViews(domain);
    }

    const groupData = await this.groupService.group(domain);
    groupData.dailyViews = groupData.counts[0]?.count || 0;
    groupData.totalViews = groupData.totalViews + groupData.dailyViews;
    delete groupData.counts;
    return groupData;
  }

  @Patch('last-post-create-at')
  async updateLastPostCreateAt(@Body('groupId') groupId: number) {
    return this.groupService.update22(groupId);
  }
}
