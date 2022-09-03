import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ConflictException,
  Res,
  Req,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from 'src/cache/cache.service';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly cacheService: CacheService,
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
        connect: { id: 'dellose' },
      },
      published: true,
      tags: {
        create: tags.map((name) => ({
          tag: { connectOrCreate: { where: { name }, create: { name } } },
        })),
      },
      links: {
        create: links.map((link) => ({
          link: {
            connectOrCreate: { where: { url: link.url }, create: { ...link } },
          },
        })),
      },
    });
  }

  @Get()
  findAll(@Query() { tag }) {
    if (tag) {
      return this.groupService.groups({
        where: { tags: { some: { tag: { name: tag } } } },
        orderBy: { createdAt: 'desc' },
      });
    }
    return this.groupService.groups({ orderBy: { createdAt: 'desc' } });
  }

  @Get('tags')
  findAllTag() {
    return this.groupService.groupTags();
  }

  @Get(':domain')
  async findOne(@Param('domain') domain: string) {
    if (await this.cacheService.isUpdatableViewsByGroupDomain(domain)) {
      console.log('record views');
      await this.groupService.upsertDailyViews(domain);
      await this.groupService.updateTotalViews(domain);
    }

    const groupData = await this.groupService.group(domain);
    this.cacheService.setGroupLinks(groupData.links);

    groupData.dailyViews = groupData.counts[0].count;
    groupData.totalViews = groupData.totalViews + groupData.dailyViews;
    delete groupData.counts;
    return groupData;
  }
}
