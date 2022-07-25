export type ErrorMessage = string | boolean;
export type TabName = string & ('group' | 'stack');
export type Link = {
  url: string;
  rssUrl?: string;
  title: string;
  description?: string;
  type: string;
  imagePath?: string;
};
export type Group = {
  id?: number;
  domain: string;
  title: string;
  description: string;
  links: Link[];
  tags: string[];
  created_at: Date;
} & GroupCount;
export type GroupCount = {
  today: number;
  total: number;
};
export type GroupTag = {
  index: number;
  groupId: string;
  name: string;
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
export type CountGroup = {
  [key: string]: number;
};
export type Days = {
  date: string;
  day: number;
  month: string;
};
export type DaysCount = Days & {
  count: number;
};
export type StackJson = {
  name: string;
  label: string;
  version: string;
  description: string;
  path: string;
  url: string;
  githubStar: string;
};
