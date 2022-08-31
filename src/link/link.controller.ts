import { Controller, Patch, Param } from '@nestjs/common';
import { LinkService } from './link.service';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.linkService.update(+id);
  }
}
