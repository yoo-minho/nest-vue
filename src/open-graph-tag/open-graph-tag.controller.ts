import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OpenGraphTagService } from './open-graph-tag.service';
import { CreateOpenGraphTagDto } from './dto/create-open-graph-tag.dto';
import { UpdateOpenGraphTagDto } from './dto/update-open-graph-tag.dto';

@Controller('open-graph-tag')
export class OpenGraphTagController {
  constructor(private readonly openGraphTagService: OpenGraphTagService) {}

  @Post()
  create(@Body() createOpenGraphTagDto: CreateOpenGraphTagDto) {
    return this.openGraphTagService.create(createOpenGraphTagDto);
  }

  @Get()
  findAll() {
    return this.openGraphTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.openGraphTagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOpenGraphTagDto: UpdateOpenGraphTagDto) {
    return this.openGraphTagService.update(+id, updateOpenGraphTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.openGraphTagService.remove(+id);
  }
}
