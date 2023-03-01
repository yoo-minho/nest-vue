import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAllTag() {
    const response = await this.tagService.findAll();
    return response.filter((v) => v._count.groups > 0);
  }
}
