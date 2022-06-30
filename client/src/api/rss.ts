import { Link, Post, RssItem } from '../types/common';
import axiosClient from './base';
import { getDateStringByMs } from '../plugin/dayjs';

export default {
  async index(linkInfo: Link): Promise<Post[]> {
    const res = await axiosClient.get('rss', { params: { url: linkInfo.rssUrl || linkInfo.url } });
    const _items = res.data.items || [];
    return _items.map(
      (item: RssItem): Post => ({
        ...item,
        linkInfo, //신규
        createdStr: new Date(item.created).toLocaleString(), //신규 : Local String Format
        dateString: getDateStringByMs(item.created), //신규 : YYYY-MM-DD Format
        description: removeHtmlTag(htmlDecode(htmlDecode(item.description || item.content || ''))), //수정
      }),
    );
  },
};

function htmlDecode(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent || '';
}

function removeHtmlTag(input: string) {
  return input.replace(/<[^>]*>?/g, '');
}
