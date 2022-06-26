export type ErrorMessage = string | boolean;
export type TabName = string & ('group' | 'stack');
export type Link = {
  index: number;
  url: string;
  type: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
};
export type Group = {
  index: number;
  id: string;
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
