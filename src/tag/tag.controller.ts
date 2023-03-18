import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { TagService } from './tag.service';

@UseGuards(JwtAuthGuard)
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAllTag() {
    const response = await this.tagService.findAll();
    return response.filter((v) => v._count.groups > 0);
  }
}
