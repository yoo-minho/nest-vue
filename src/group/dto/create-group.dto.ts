import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  domain: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  links: {
    url: string;
    rssUrl: string;
    title: string;
    description: string;
    type: string;
    imagePath: string;
  }[];
}
