import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { firstValueFrom } from 'rxjs';
import { parse } from 'rss-to-json';
import { RssResultDto } from './dto/rss-result.dto';
import { RssCreateDto } from './dto/rss-create.dto';
import jsdom from 'jsdom';

@Injectable()
export class RssService {
  constructor(public httpService: HttpService) {}

  async findOne(url: string, lastPostCreatedAt?: Date) {
    const urlConverter = new UrlConverter(this.httpService);
    const oldLastPostCreateAt = new Date(lastPostCreatedAt || 0);
    const rssUrl = await urlConverter.convertRssUrl(url);
    let rssItems;
    try {
      const result = await parse(rssUrl, {});
      rssItems = result.items;
    } catch (e) {
      console.error(e);
      return {
        items: [],
        itemLength: 0,
      };
    }
    const _items = rssItems
      .map((item) => ({
        ...item,
        createdAt: new Date(item.created),
        link: urlConverter.getUrl(item.link),
      }))
      .filter(
        ({ createdAt }) =>
          createdAt > oldLastPostCreateAt && createdAt < new Date(),
      );
    return {
      items: _items,
      itemLength: _items.length,
    };
  }

  async findConvertOne(url: string) {
    const urlConverter = new UrlConverter(this.httpService);
    const contentsConverter = new ContentsConverter();
    const rssUrl = await urlConverter.convertRssUrl(url);
    let rssItems: RssCreateDto[] = [];
    try {
      const { items } = (await parse(rssUrl, {})) as { items: RssResultDto[] };
      rssItems = items.map((item) => {
        const { title, description } = contentsConverter.convertItem(item);
        const url = urlConverter.getUrl(item.link);
        const createdAt = new Date(item.created);
        return { title, description, createdAt, url };
      });
    } catch (e) {
      console.error(e);
    } finally {
      return rssItems;
    }
  }
}

class UrlConverter {
  constructor(private httpService: HttpService) {}

  getUrl(link): string {
    if (typeof link === 'string') return link;
    if (link instanceof Array)
      return link.filter((data) => data.type === 'text/html')?.[0].href;
    return '';
  }

  async convertRssUrl(url: string): Promise<string> {
    return (
      Object.entries(this.getBlogExpression())
        .filter(([, { reg }]) => this.isTest(url, reg))
        .map(([, { reg, rss, replacePipe }]) =>
          rss(replacePipe ? this.replaceUrl(url, reg) : url),
        )[0] || url
    );
  }

  private isTest = (url: string, reg: RegExp | RegExp[]): boolean => {
    if (reg instanceof RegExp) {
      return new RegExp(reg).test(url);
    } else {
      let ok = false;
      reg.forEach((r) => {
        ok = ok || new RegExp(r).test(url);
      });
      return ok;
    }
  };

  private replaceUrl = (url: string, reg: RegExp | RegExp[]): string => {
    if (reg instanceof RegExp) {
      return url.replace(reg, '$1');
    } else {
      return reg
        .map((r) => (this.isTest(url, r) ? url.replace(r, '$1') : ''))
        .join('');
    }
  };

  private async rssBrunch(url: string) {
    const response: any = await firstValueFrom(this.httpService.get(url));
    if (response.status !== 200) return '';
    const html = response.data;
    const $ = cheerio.load(html);
    const rssUrl = $('link[type="application/rss+xml"]').attr('href');
    return rssUrl;
  }

  private getBlogExpression() {
    return {
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
        rss: (mediumId: string) => `https://medium.com/feed/${mediumId}`,
        replacePipe: true,
      },
      MEDIUM_1: {
        reg: /https:\/\/([0-9a-zA-Z_-]*)\.medium.com(\/)?([0-9a-zA-Z]*)/gi,
        rss: (mediumId: string) => `https://medium.com/feed/@${mediumId}`,
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
  }
}

class ContentsConverter {
  convertItem = (item: RssResultDto) => {
    const { title, description, content } = item;
    return {
      title: this.substring50(title),
      description: this.pipe(
        this.htmlDecode,
        this.htmlDecode,
        this.removeBlank,
        this.removeNewLine,
        this.removeHtmlTag,
        this.trim,
        this.substring100,
      )(description || content || ''),
    };
  };

  pipe =
    (...funcs: ((x: string) => string)[]) =>
    (v: string) =>
      funcs.reduce((res, func) => func(res), v);

  trim(input: string) {
    return input.trim();
  }

  htmlDecode(input: string): string {
    const { JSDOM } = jsdom;
    const dom = new JSDOM(input);
    const doc = dom.window.document;
    const elements =
      doc.documentElement.getElementsByClassName('revenue_unit_wrap');
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
    return doc.documentElement.textContent || '';
  }

  removeHtmlTag(input: string) {
    return input.replace(/<[^>]*>?/g, '');
  }

  removeBlank(input: string) {
    return input.replace(/^\s+|\s+$/gm, '');
  }

  removeNewLine(input: string) {
    return input.replace(/\n/g, ' ');
  }

  substring50 = (input: string) => {
    return (
      input.substring(0, 40) +
      this.removeEmojiUnicode(input.substring(40)).substring(0, 10)
    );
  };

  substring100 = (input: string) => {
    return (
      input.substring(0, 90) +
      this.removeEmojiUnicode(input.substring(90)).substring(0, 10)
    );
  };

  removeEmojiUnicode(str: string) {
    return [...str].map((v) => (v === v.charAt(0) ? v : '')).join('');
  }

  // decodeHtmlEntity(input: string) {
  //   const textarea = document.createElement('textarea');
  //   textarea.innerHTML = input;
  //   return textarea.value;
  // }
}
