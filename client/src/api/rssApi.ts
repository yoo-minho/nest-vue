import { Link, RssItem } from '../types/common';
import axiosClient from './base';
import PostAPI from './postApi';
import { pipe } from '../util';

export default {
  async scrap(_link: Link): Promise<void> {
    const scrapUrl = _link.rssUrl || _link.url;
    const res = await axiosClient.get('rss', { params: { url: scrapUrl } });
    const _items = res.data.items || [];
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
        title: substring30(scrapUrl.includes('twitch') ? decodeHtmlEntity(title) : title),
        description: _description,
        createdAt: new Date(created),
        url: link,
      };
    });
    await PostAPI.createPosts(_link.id || 0, postItems);
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

function substring30(input: string) {
  return input.substring(0, 30);
}

function substring100(input: string) {
  return input.substring(0, 100);
}

function decodeHtmlEntity(input: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}
