import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class RssQueryDto {
  @IsString()
  url: string;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  scrapAt?: Date;
}
