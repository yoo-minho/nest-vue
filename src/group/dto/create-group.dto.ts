import { ApiProperty } from '@nestjs/swagger';
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
import { LinkItemDto } from './link-item.dto';

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
