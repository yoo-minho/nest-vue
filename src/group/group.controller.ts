import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    const { domain, title, description, tags, links } = createGroupDto;
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
  findAll(@Query() query) {
    const { tag } = query;

    return this.groupService.groups({
      where: { tags: { some: { tag: { name: tag } } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  @Get('tags')
  findAllTag() {
    return this.groupService.groupTags();
  }

  @Get(':domain')
  async findOne(@Param('domain') domain: string) {
    await this.groupService.upsertCount(domain);
    return await this.groupService.group(domain);
  }
}
