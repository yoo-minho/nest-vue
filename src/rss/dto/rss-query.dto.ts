import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RssQueryDto {
  @IsString()
  url: string;

  @IsNumber()
  linkId: number;

  @IsOptional()
  @Transform(({ value }) => new Date(value))
  scrapAt?: Date;
}
