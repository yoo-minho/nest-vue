import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  IsString,
  MaxLength,
  IsDefined,
  IsArray,
  ArrayNotEmpty,
  ValidateNested,
  IsDate,
} from 'class-validator';

class PostItemDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @MaxLength(50)
  @IsString()
  title: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  createdAt: Date;

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
