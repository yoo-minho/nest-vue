import { Controller, Patch, Param, Get, Query } from '@nestjs/common';
import { LinkService } from './link.service';

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

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.linkService.update(+id);
  }
}
