export type ErrorMessage = string | boolean;
export type TabName = string & ('group' | 'stack');
export type Link = {
  id?: number;
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
  description?: string;
  links?: { link: Link }[];
  tags?: string[];
  created_at?: Date;
  dailyViews?: number;
  totalViews?: number;
};
export type GroupTag = {
  index: number;
  groupId: string;
  name: string;
};
export type RssItem = {
  created: number;
  description?: string;
  content?: string;
  link: string;
  title: string;
};
export type Post = {
  createdAt: Date;
  description?: string;
  content?: string;
  linkId: number;
  link: Link;
  url: string;
  title: string;
};
export type LastPost = {
  linkId: number;
  createdAt: string;
  title: string;
  dateString: string;
  agoString: string;
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
export type DaysAllCounts = {
  date: string;
  day: number;
  month: string;
  count: {
    [key: string]: number;
  };
};
export type DaysCounts = {
  date: string;
  day: number;
  month: string;
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
