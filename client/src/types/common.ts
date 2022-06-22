export type ErrorMessage = string | boolean;
export type BlogType = string & ('NAVER' | 'TISTORY' | 'VELOG');
export type TabName = string & ('group' | 'stack');
export type Link = {
  index: number;
  url: string;
  type: BlogType;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
};
export type Group = {
  index: number;
  title: string;
  description: string;
  links: Link[];
};
export type RssItem = {
  category: string[];
  created: number;
  description?: string;
  content?: string;
  link: string;
  media: object;
  published: number;
  title: string;
};
export type Post = RssItem & {
  createdStr: string;
  dateString: string;
  linkInfo: Link;
};
export type CountGroupByDate = {
  [key: string]: number;
};
export type Days = {
  date: string;
  day: number;
  month: string;
};
