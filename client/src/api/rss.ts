import { Link, RssItem } from '../types/common';
import axiosClient from './base';

export default {
  async index(linkInfo: Link) {
    const res = await axiosClient.get('rss', { params: { url: linkInfo.url } });
    const _items = res.data.items || [];
    return _items.map((item: RssItem) => ({
      ...item,
      linkInfo, //신규
      createdStr: new Date(item.created).toLocaleString(), //신규
      description: removeHtmlTag(htmlDecode(htmlDecode(item.description || item.content || ''))), //수정
    }));
  },
};

function htmlDecode(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent || '';
}

function removeHtmlTag(input: string) {
  return input.replace(/<[^>]*>?/g, '');
}
