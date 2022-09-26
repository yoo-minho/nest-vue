import platformArray from '@/data/platform.json';
import { BlogType } from '@/types/common';

export const getBlogType = (url = ''): BlogType =>
  (platformArray.map((p) => p.type).find((platform) => url.toUpperCase().includes(platform)) || 'RSS') as BlogType;

export const getBlogImagePath = (type: BlogType) => {
  const target = platformArray.filter((p) => p.type === type?.toUpperCase());
  return target.length > 0 ? target[0].path : '';
};

export const getImage = (path: string) =>
  new URL(`../assets/images/${path || 'platform/rss.png'}`, import.meta.url).toString();

export const getImageByBlogType = (type: BlogType): string => getImage(getBlogImagePath(type));

export const isTextImage = (url: string) => {
  if (url === 'https://t1.daumcdn.net/tistory_admin/static/images/openGraph/opengraph.png') {
    return true;
  } else {
    return false;
  }
};
