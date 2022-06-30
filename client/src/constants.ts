import platformArray from './data/platform.json';

export const getBlogType = (url = ''): string =>
  platformArray
    .map((platform) => platform.name.toUpperCase())
    .find((platform) => url.toUpperCase().includes(platform)) || '';

export const getBlogImagePath = (type: string) => {
  const target = platformArray.filter((v) => v.name?.toUpperCase() === type?.toUpperCase());
  return target.length > 0 ? target[0].path : '';
};

export const getImage = (path: string) =>
  new URL(`./assets/images/${path || 'platform/rss.png'}`, import.meta.url).toString();
export const getImageByBlogType = (type: string): string => getImage(getBlogImagePath(type));
