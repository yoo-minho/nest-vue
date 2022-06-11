import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { parse } from 'rss-to-json';
import { firstValueFrom } from 'rxjs';

const BLOG_EXPRESSION = {
  NAVER: /https:\/\/blog.naver.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  TISTORY: /https:\/\/([0-9a-zA-Z_-]*)\.tistory.com(\/)?([0-9a-zA-Z]*)/gi,
  VELOG: /https:\/\/velog.io\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  BRUNCH: /https:\/\/brunch.co.kr\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  MEDIUM: /https:\/\/medium.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  YOUTUBE:
    /https:\/\/www.youtube.com\/channel\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
};

@Injectable()
export class RssService {
  constructor(private httpService: HttpService) {}

  async findOne(url: string) {
    const rssUrl = await convertRssUrl(url, this.httpService);
    let result;
    try {
      result = await parse(rssUrl, {});
    } catch (e) {
      result = { success: false, message: e };
    }
    return result;
  }
}

async function convertRssUrl(
  url: string,
  httpService: HttpService,
): Promise<string> {
  const isTest = (url: string, reg: RegExp): boolean =>
    new RegExp(reg).test(url);

  if (isTest(url, BLOG_EXPRESSION.NAVER)) {
    const blogId = url.replace(BLOG_EXPRESSION.NAVER, '$1');
    return `https://rss.blog.naver.com/${blogId}.xml`;
  }

  if (isTest(url, BLOG_EXPRESSION.TISTORY)) {
    const tistoryId = url.replace(BLOG_EXPRESSION.TISTORY, '$1');
    return `https://${tistoryId}.tistory.com/rss`;
  }

  if (isTest(url, BLOG_EXPRESSION.VELOG)) {
    const velogId = url.replace(BLOG_EXPRESSION.VELOG, '$1');
    return `https://v2.velog.io/rss/${velogId}`;
  }

  if (isTest(url, BLOG_EXPRESSION.BRUNCH)) {
    const response = await firstValueFrom(httpService.get(url));
    if (response.status !== 200) return '';
    const html = response.data;
    const $ = cheerio.load(html);
    const rssUrl = $('link[type="application/rss+xml"]').attr('href');
    return rssUrl;
  }

  if (isTest(url, BLOG_EXPRESSION.MEDIUM)) {
    const mediumId = url.replace(BLOG_EXPRESSION.MEDIUM, '$1');
    return `https://medium.com/feed/${mediumId}`;
  }

  if (isTest(url, BLOG_EXPRESSION.YOUTUBE)) {
    const youtubeId = url.replace(BLOG_EXPRESSION.YOUTUBE, '$1');
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeId}`;
  }

  return url;
}
