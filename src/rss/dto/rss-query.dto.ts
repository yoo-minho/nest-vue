import { Transform } from 'class-transformer';

export class RssQueryDto {
  url: string;

  @Transform(({ value }) => new Date(value))
  scrapAt?: Date;
}
