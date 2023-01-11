import { BLOG_TYPE } from '@prisma/client';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LinkItemDto {
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
