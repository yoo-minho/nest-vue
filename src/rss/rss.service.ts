import { Injectable } from '@nestjs/common';
import { parse } from 'rss-to-json';

@Injectable()
export class RssService {
  async findOne(url: string) {
    let result;
    try {
      result = await parse(convertRssUrl(url), {});
    } catch (e) {
      result = { success: false, message: e.result.error };
    }
    return result;
  }
}

function convertRssUrl(url: string): string {
  const naverBlogIdRex =
    /https:\/\/blog.naver.com\/([0-9a-zA-Z]*)(\/)?([0-9a-zA-Z]*)/gi;
  const tistoryIdRex =
    /https:\/\/([0-9a-zA-Z]*)\.tistory.com(\/)?([0-9a-zA-Z]*)/gi;

  if (url.match(naverBlogIdRex).length > 0) {
    const blogId = url.replace(naverBlogIdRex, '$1');
    return `https:// https://rss.blog.naver.com/${blogId}.xml`;
  }

  if (url.match(tistoryIdRex).length > 0) {
    const tistoryId = url.replace(tistoryIdRex, '$1');
    return `https://${tistoryId}.tistory.com/rss`;
  }

  return url;
}
