import { BlogType } from './types/common';

export const BLOGS = ['NAVER', 'TISTORY', 'VELOG', 'BRUNCH', 'MEDIUM', 'YOUTUBE'];
export const BLOG_IMAGES = {
  NAVER: 'naver.png',
  TISTORY: 'tistory.png',
  VELOG: 'velog.png',
  BRUNCH: 'brunch.png',
  MEDIUM: 'medium.png',
  YOUTUBE: 'youtube.png',
};
const getImageUrl = (path: string) => new URL(`./assets/images/${path}`, import.meta.url).toString();
export const getBlogIconUrl = (type: BlogType): string => getImageUrl(`blog-icon/${BLOG_IMAGES[type]}`);
export const getStacksImageUrl = (v: string): string => getImageUrl(`stacks/${v}`);
