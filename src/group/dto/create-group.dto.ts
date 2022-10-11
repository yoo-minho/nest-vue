import { ApiProperty } from '@nestjs/swagger';
import { BLOG_TYPE } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class LinkItemDto {
  @IsString()
  url: string;

  @IsString()
  @IsEmpty()
  @MaxLength(500)
  rssUrl: string;

  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @IsEmpty()
  @MaxLength(100)
  description: string;

  @IsString()
  type: BLOG_TYPE;

  @IsString()
  @IsEmpty()
  @MaxLength(500)
  imagePath: string;
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
