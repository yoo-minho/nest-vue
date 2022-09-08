import { Link, RssItem } from '../types/common';
import axiosClient from './base';
import PostAPI from './postApi';
import LinkAPI from './linkApi';

import { pipe } from '../util';

export default {
  async scrap(_link: Link) {
    const scrapUrl = _link.rssUrl || _link.url;
    const res = await axiosClient.get('rss', { params: { url: scrapUrl, scrapAt: _link.scrapAt } });
    const _items = res.data.items || [];
    if (_items.length === 0) {
      if (!_link.id) return;
      await LinkAPI.updateScrapAt(_link.id);
      return;
    }
    const postItems = _items.map(({ title, description, content, created, link }: RssItem) => {
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
        title: substring20(scrapUrl.includes('twitch') ? decodeHtmlEntity(title) : title),
        description: _description,
        createdAt: new Date(created),
        url: link,
      };
    });
    if (!_link.id) return;
    await PostAPI.createPosts(_link.id, postItems);
    await LinkAPI.updateScrapAt(_link.id);
  },
};

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

function substring20(input: string) {
  return input.substring(0, 20);
}

function substring100(input: string) {
  return input.substring(0, 100);
}

function decodeHtmlEntity(input: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}
