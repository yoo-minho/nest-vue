export class CreateGroupDto {
  domain: string;
  title: string;
  description?: string;
  tags: string[];
  links: {
    url: string;
    rssUrl: string;
    title: string;
    description: string;
    type: string;
    imagePath: string;
  }[];
}
