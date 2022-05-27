import { PartialType } from '@nestjs/mapped-types';
import { CreateOpenGraphTagDto } from './create-open-graph-tag.dto';

export class UpdateOpenGraphTagDto extends PartialType(CreateOpenGraphTagDto) {}
