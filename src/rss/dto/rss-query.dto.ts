import { Transform } from 'class-transformer';
import { IsDate } from 'class-validator';

export class RssQueryDto {
  url: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  scrapAt: Date;
}
