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
  Put,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/cache/cache.service';
import { LinkService } from 'src/link/link.service';
import { PostService } from 'src/post/post.service';
import { UpdateGroupDto } from './dto/update-group.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { TagService } from 'src/tag/tag.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly cacheService: CacheService,
    private readonly linkService: LinkService,
    private readonly tagService: TagService,
    private readonly postService: PostService,
  ) {}

  @Post()
  async create(@Body() createGroupDto: CreateGroupDto) {
    const { domain, title, description, tags, links } = createGroupDto;
    const groupData = await this.groupService.groupByDomain(domain);
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

  @Put()
  async update(@Body() updateGroupDto: UpdateGroupDto) {
    const { id, domain, title, description, tags, links } = updateGroupDto;
    if (!id) {
      throw new BadRequestException('필수값 에러!');
    }
    const groupData1 = await this.groupService.groupById(id);
    if (groupData1.domain === domain) {
      //pass
    } else {
      const groupData2 = await this.groupService.groupByDomain(domain);
      if (groupData2 !== null) {
        throw new ConflictException('중복된 도메인이 존재합니다!');
      }
    }

    const linkIds = links.map((l) => l.id);
    const deleteLinkIds = groupData1.links
      .filter(({ link }) => !linkIds.includes(link.id))
      .map(({ link }) => link.id);

    const deleteTagIds = groupData1.tags
      .filter(({ tag }) => !tags.includes(tag.name))
      .map(({ tag }) => tag.id);

    const upsertTagsResponse = await this.tagService.upsert(tags);
    const saveTags = upsertTagsResponse.map((t) =>
      t.status === 'fulfilled' ? t.value : { id: -1 },
    );

    const upsertLinksResponse = await this.linkService.upsert(links);
    const saveLinks = upsertLinksResponse.map((l) =>
      l.status === 'fulfilled' ? l.value : { id: -1 },
    );

    return this.groupService.updateGroup(id, {
      domain,
      title,
      description,
      published: true, //TO-DO. 개발 true, 운영 false
      tags: {
        connectOrCreate: saveTags?.map((tag) => ({
          where: {
            groupId_tagId: {
              groupId: id,
              tagId: tag.id,
            },
          },
          create: {
            tag: {
              connect: {
                id: tag.id,
              },
            },
          },
        })),
        deleteMany: {
          tagId: {
            in: deleteTagIds,
          },
        },
      },
      links: {
        connectOrCreate: saveLinks?.map((link) => ({
          where: {
            groupId_linkId: {
              groupId: id,
              linkId: link.id,
            },
          },
          create: {
            link: {
              connect: {
                id: link.id,
              },
            },
          },
        })),
        deleteMany: {
          linkId: {
            in: deleteLinkIds,
          },
        },
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

    const groupData = await this.groupService.groupByDomain(domain);
    groupData.dailyViews = groupData.counts[0]?.count || 0;
    groupData.totalViews = groupData.totalViews + groupData.dailyViews;
    delete groupData.counts;
    return groupData;
  }

  @Patch('last-post-create-at')
  async updateLastPostCreateAt(@Body('groupId') groupId: number) {
    return this.groupService.updateLastPostCreatedAt(groupId);
  }
}
