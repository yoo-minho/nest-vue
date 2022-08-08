import axiosClient from './base';
import { AxiosError } from 'axios';
import { LastPost, Link, RssItem } from '../types/common';
import { getAgoString, getDateString } from '../plugin/dayjs';

export default {
  async createPosts(linkId: number, items: RssItem[]) {
    try {
      await axiosClient.post('post', { linkId, items });
    } catch (axiosError) {
      const err = axiosError as AxiosError<{ res: { message: string } }>;
      const message = err.response?.data?.res?.message || err.message;
      throw new Error(message);
    }
  },
  async findAllPosts(links: { link: Link }[]) {
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0 }));
    try {
      const { data } = await axiosClient.post('post/in', { linkIds: linksBundle });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findLast(links: { link: Link }[]) {
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0, title: link.title }));
    try {
      const { data } = await axiosClient.post('post/last', { linkIds: linksBundle });
      return data.map((post: LastPost) => ({
        ...post,
        dateString: getDateString(new Date(post.createdAt)),
        agoString: getAgoString(new Date(post.createdAt)),
      }));
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async countByDate(links: { link: Link }[]) {
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0, title: link.title }));
    try {
      const { data } = await axiosClient.post('post/count/date', { linkIds: linksBundle });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};