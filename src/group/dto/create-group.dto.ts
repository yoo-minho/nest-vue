import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty()
  domain: string;

  @ApiProperty()
  title: string;

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
