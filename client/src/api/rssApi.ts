import { Link, Post, RssItem } from '../types/common';
import axiosClient from './base';
import { getDateStringByMs } from '../plugin/dayjs';
import PostAPI from './postApi';

export default {
  async scrap(_link: Link): Promise<void> {
    const scrapUrl = _link.rssUrl || _link.url;
    const res = await axiosClient.get('rss', { params: { url: scrapUrl } });
    const _items = res.data.items || [];
    const postItems = _items.map(({ title, description, content, created, link }: RssItem) => ({
      title: (scrapUrl.includes('twitch') ? decodeHtmlEntity(title) : title).substring(0, 30),
      description: removeHtmlTag(
        htmlDecode(htmlDecode(removeSpecialTag(removeNewLine(removeBlank(description || content || ''))))),
      ).substring(0, 100),
      createdAt: new Date(created),
      url: link,
    }));
    console.log({ postItems });
    await PostAPI.createPosts(_link.id || 0, postItems);

    // return _items.map(
    //   (item: RssItem): Post => ({
    //     ...item,
    //     linkInfo: _link, //신규
    //     createdStr: new Date(item.created).toLocaleString(), //신규 : Local String Format
    //     dateString: getDateStringByMs(item.created), //신규 : YYYY-MM-DD Format
    //     title: _link.url.includes('twitch') ? decodeHtmlEntity(item.title) : item.title, //수정
    //     description: removeHtmlTag(htmlDecode(htmlDecode(item.description || item.content || ''))), //수정
    //   }),
    // );
  },
  // async index(_link: Link) {
  //   const scrapUrl = _link.rssUrl || _link.url;
  //   const res = await axiosClient.get('rss', { params: { url: scrapUrl } });
  //   const _items = res.data.items || [];
  //   return _items.map(
  //     (item: RssItem): Post => ({
  //       ...item,
  //       linkInfo: _link, //신규
  //       createdStr: new Date(item.created).toLocaleString(), //신규 : Local String Format
  //       dateString: getDateStringByMs(item.created), //신규 : YYYY-MM-DD Format
  //       title: _link.url.includes('twitch') ? decodeHtmlEntity(item.title) : item.title, //수정
  //       description: removeHtmlTag(htmlDecode(htmlDecode(item.description || item.content || ''))), //수정
  //     }),
  //   );
  // },
};

function htmlDecode(input: string): string {
  const doc = new DOMParser().parseFromString(input, 'text/html');
  return doc.documentElement.textContent || '';
}

function removeSpecialTag(input: string) {
  const rex = /(\<div class=\"revenue_unit_wrap)(.*?)(<\/div>)/gi;
  console.log(input);
  console.log(rex.test(input));
  return input.replace(rex, '');
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

function decodeHtmlEntity(input: string) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = input;
  return textarea.value;
}
