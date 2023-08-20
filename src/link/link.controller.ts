import {
  Controller,
  Patch,
  Param,
  Get,
  Query,
  Post,
  Body,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { LinkItemDto } from 'src/group/dto/link-item.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  findAll(@Query() { tag, page }) {
    const isExistsTag = !!tag && tag !== 'All';
    const tagOption = isExistsTag ? { type: { equals: tag } } : {};
    const PAGE_PER_COUNT = 10;
    page = page || 1;
    return this.linkService.links({
      where: { ...tagOption, lastPostCreatedAt: { not: null } },
      orderBy: { lastPostCreatedAt: 'desc' },
      skip: (page - 1) * PAGE_PER_COUNT,
      take: PAGE_PER_COUNT,
    });
  }

  @Post()
  create(@Body() linkItemDto: LinkItemDto) {
    //중복 제거
    return this.linkService.createLink(linkItemDto);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.linkService.update(+id);
  }
}
