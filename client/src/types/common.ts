export type ErrorMessage = string | boolean;
export type BlogType = string & ('NAVER' | 'TISTORY' | 'VELOG');
export type TabName = string & ('group' | 'stack');
export type Link = {
  index: number;
  url: string;
  type: BlogType;
  ogTitle: string;
  ogDescription: string;
};
