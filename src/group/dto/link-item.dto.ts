import { BLOG_TYPE } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class LinkItemDto {
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsString()
  url: string;

  @IsString()
  @MaxLength(500)
  rssUrl?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(100)
  description?: string;

  @IsString()
  @IsNotEmpty()
  type: BLOG_TYPE;

  @IsString()
  @MaxLength(500)
  imagePath?: string;
}
