import { Injectable } from '@nestjs/common';
import { parse } from 'rss-to-json';

const naverBlogIdReg =
  /https:\/\/blog.naver.com\/([0-9a-zA-Z]*)(\/)?([0-9a-zA-Z]*)/gi;
const tistoryIdReg =
  /https:\/\/([0-9a-zA-Z]*)\.tistory.com(\/)?([0-9a-zA-Z]*)/gi;
const velogIdReg = /https:\/\/velog.io\/@([0-9a-zA-Z]*)(\/)?([0-9a-zA-Z]*)/gi;

@Injectable()
export class RssService {
  async findOne(url: string) {
    const rssUrl = convertRssUrl(url);
    let result;
    try {
      result = await parse(rssUrl, {});
    } catch (e) {
      result = { success: false, message: e };
    }
    return result;
  }
}

function convertRssUrl(url: string): string {
  const isTest = (url: string, reg: RegExp): boolean =>
    new RegExp(reg).test(url);

  if (isTest(url, naverBlogIdReg)) {
    const blogId = url.replace(naverBlogIdReg, '$1');
    return `https:// https://rss.blog.naver.com/${blogId}.xml`;
  }

  if (isTest(url, tistoryIdReg)) {
    const tistoryId = url.replace(tistoryIdReg, '$1');
    return `https://${tistoryId}.tistory.com/rss`;
  }

  if (isTest(url, velogIdReg)) {
    const velogId = url.replace(velogIdReg, '$1');
    return `https://v2.velog.io/rss/${velogId}`;
  }

  return url;
}
