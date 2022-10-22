import { Link, RssItem, ScrapItem, ScrapResult } from '../types/common';
import axiosClient from './base';
import PostAPI from './postApi';
import { pipe } from '../util';

export default {
  async scrap(_link: Link): Promise<ScrapResult> {
    const scrapUrl = _link.rssUrl || _link.url;
    if (!_link.id) {
      throw Error('링크 아이디가 유효하지 않습니다!');
    }
    if (!scrapUrl) {
      throw Error('링크 유알엘이 유효하지 않습니다!');
    }
    const res = await axiosClient.post('rss', { linkId: _link.id, url: scrapUrl, scrapAt: _link.scrapAt });
    const _items = res.data.items || [];
    if (_items.length > 0) {
      await PostAPI.createPosts(_link.id, convertItem(_items, scrapUrl));
    }
    return { linkId: _link.id, lastPostCreateAt: res.data.lastPostCreateAt };
  },
};

function convertItem(_items: RssItem[], scrapUrl: string): ScrapItem[] {
  return _items.map(({ title, description, content, created, link }) => {
    const _description = pipe(
      htmlDecode,
      htmlDecode,
      removeBlank,
      removeNewLine,
      removeHtmlTag,
      trim,
      substring100,
    )(description || content || '');
    return {
      title: substring50(scrapUrl.includes('twitch') ? decodeHtmlEntity(title) : title),
      description: _description,
      created,
      createdAt: new Date(created),
      url: link,
    };
  });
}

function trim(input: string) {
  return input.trim();
}

function htmlDecode(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  const elements = doc.documentElement.getElementsByClassName('revenue_unit_wrap');
  while (elements.length > 0) {
    elements[0].parentNode?.removeChild(elements[0]);
  }
  return doc.documentElement.textContent || '';
}

function removeHtmlTag(input: string) {
  return input.replace(/<[^>]*>?/g, '');
}

function removeBlank(input: string) {
  return input.replace(/^\s+|\s+$/gm, '');
}

function removeNewLine(input: string) {
  return input.replace(/\n/g, ' ');
}

function substring50(input: string) {
  return input.substring(0, 50);
}

function substring100(input: string) {
  return input.substring(0, 100);
}

function decodeHtmlEntity(input: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}
