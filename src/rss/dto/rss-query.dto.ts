import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';

export class RssQueryDto {
  @IsString()
  url: string;

  @Transform(({ value }) => new Date(value))
  scrapAt?: Date;
}
