import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { parse } from 'rss-to-json';
import { ConsoleLogger } from '@nestjs/common/services';

type RssRes = {
  title?: string;
  description?: string;
  link?: string;
  url?: string;
  image?: string;
  category?: string;
  items?: RssResItem[];
  success?: boolean;
  message?: Error;
  scrapAt?: Date;
  itemLength?: number;
  lastPostCreateAt?: Date;
};

type RssResItem = {
  title?: string;
  description?: string;
  content?: string;
  created?: number;
  createdAt?: Date;
  link?: string;
};

const isTest = (url: string, reg: RegExp): boolean => new RegExp(reg).test(url);

@Injectable()
export class RssService {
  BLOG_EXPRESSION = {
    NAVER: {
      reg: /https:\/\/blog.naver.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
      rss: (blogId: string) => `https://rss.blog.naver.com/${blogId}.xml`,
      replacePipe: true,
    },
    TISTORY: {
      reg: /https:\/\/([0-9a-zA-Z_-]*)\.tistory.com(\/)?([0-9a-zA-Z]*)/gi,
      rss: (tistoryId: string) => `https://${tistoryId}.tistory.com/rss`,
      replacePipe: true,
    },
    VELOG: {
      reg: /https:\/\/velog.io\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
      rss: (velogId: string) => `https://v2.velog.io/rss/${velogId}`,
      replacePipe: true,
    },
    BRUNCH: {
      reg: /https:\/\/brunch.co.kr\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
      rss: (url: string) => this.rssBrunch(url),
      replacePipe: false,
    },
    MEDIUM: {
      reg: /https:\/\/medium.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
      rss: (mediumId: string) =>
        `https://medium.com/feed/${
          mediumId.includes('@') ? mediumId : '@' + mediumId
        }`,
      replacePipe: true,
    },
    YOUTUBE: {
      reg: /https:\/\/www.youtube.com\/channel\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
      rss: (youtubeId: string) =>
        `https://www.youtube.com/feeds/videos.xml?channel_id=${youtubeId}`,
      replacePipe: true,
    },
    TWITCH: {
      reg: /https:\/\/www.twitch.tv\/([0-9a-zA-Z_-]*)/gi,
      rss: (twitchId: string) =>
        `https://twitchrss.appspot.com/vod/${twitchId}`,
      replacePipe: true,
    },
  };
  constructor(public httpService: HttpService) {}

  async findOne(url: string, lastPostCreatedAt?: Date) {
    const oldLastPostCreateAt = new Date(lastPostCreatedAt || 0);

    const rssUrl = await this.convertRssUrl(url);

    console.log('rssUrl', rssUrl);

    let rssItems;
    try {
      const result: RssRes = await parse(rssUrl, {});
      rssItems = result.items;
    } catch (e) {
      return {
        oldLastPostCreateAt,
        lastPostCreateAt: lastPostCreatedAt,
        items: [],
        itemLength: 0,
      };
    }

    const result: RssRes = await parse(rssUrl, {});
    console.log({ result });
    const _items = rssItems
      .map((item) => ({
        ...item,
        createdAt: new Date(item.created),
        link: this.getUrl(item.link),
      }))
      .filter(
        ({ createdAt }) =>
          createdAt > oldLastPostCreateAt && createdAt < new Date(),
      );

    const newlastPostCreateAt = new Date(
      Math.max(..._items.map((item) => item.created)),
    );

    const itemLength = _items.length;

    return {
      oldLastPostCreateAt,
      lastPostCreateAt:
        _items.length === 0 ? oldLastPostCreateAt : newlastPostCreateAt,
      items: _items,
      itemLength,
    };
  }

  async convertRssUrl(url: string): Promise<string> {
    return (
      Object.entries(this.BLOG_EXPRESSION)
        .filter(([, { reg }]) => {
          return isTest(url, reg);
        })
        .map(([, { reg, rss, replacePipe }]) => {
          console.log('yyyxxx', url.replace(reg, '$1'));
          return rss(replacePipe ? url.replace(reg, '$1') : url);
        })[0] || url
    );
  }

  async rssBrunch(url: string) {
    const response: any = await firstValueFrom(this.httpService.get(url));
    if (response.status !== 200) return '';
    const html = response.data;
    const $ = cheerio.load(html);
    const rssUrl = $('link[type="application/rss+xml"]').attr('href');
    return rssUrl;
  }

  getUrl(link) {
    if (typeof link === 'string') return link;
    if (link instanceof Array)
      return link.filter((data) => data.type === 'text/html')?.[0].href;
    return '';
  }
}
