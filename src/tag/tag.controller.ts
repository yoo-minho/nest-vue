import { Controller, Get, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAllTag() {
    console.log('zxczxczxc1');
    const response = await this.tagService.findAll();
    console.log('zxczxczxc2');
    return response.filter((v) => v._count.groups > 0);
  }
}
