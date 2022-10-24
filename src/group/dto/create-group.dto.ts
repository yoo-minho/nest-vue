import { ApiProperty } from '@nestjs/swagger';
import { BLOG_TYPE } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class LinkItemDto {
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

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(100)
  @ApiProperty({ required: false })
  description?: string;

  @IsString({ each: true })
  @ApiProperty()
  tags: string[];

  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested()
  @Type(() => LinkItemDto)
  @ApiProperty()
  links: LinkItemDto[];
}
