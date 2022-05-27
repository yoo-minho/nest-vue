import { Injectable } from '@nestjs/common';
import { CreateOpenGraphTagDto } from './dto/create-open-graph-tag.dto';
import { UpdateOpenGraphTagDto } from './dto/update-open-graph-tag.dto';

@Injectable()
export class OpenGraphTagService {
  create(createOpenGraphTagDto: CreateOpenGraphTagDto) {
    return 'This action adds a new openGraphTag';
  }

  findAll() {
    return `This action returns all openGraphTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} openGraphTag`;
  }

  update(id: number, updateOpenGraphTagDto: UpdateOpenGraphTagDto) {
    return `This action updates a #${id} openGraphTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} openGraphTag`;
  }
}
