import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsDefined,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
} from 'class-validator';

class PostItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @MaxLength(20)
  @IsString()
  title: string;

  @IsString()
  createdAt: string | Date;

  @MaxLength(100)
  @IsString()
  description?: string;

  @IsString()
  url: string;
}

export class CreatePostDto {
  @IsNumber()
  linkId: number;

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => PostItemDto)
  items: PostItemDto[];
}
