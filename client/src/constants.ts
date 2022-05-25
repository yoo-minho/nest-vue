import { BlogType } from './types/common';

export const BLOGS = ['NAVER', 'TISTORY', 'VELOG'];
export const BLOG_IMAGES = {
  NAVER: 'naver.png',
  TISTORY: 'tistory.png',
  VELOG: 'velog.png',
};
const getImageUrl = (path: string) => new URL(`./assets/images/${path}`, import.meta.url).toString();
export const getBlogIconUrl = (type: BlogType): string => getImageUrl(`blog-icon/${BLOG_IMAGES[type]}`);
export const getStacksImageUrl = (v: string): string => getImageUrl(`stacks/${v}`);
