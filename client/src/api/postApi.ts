import axiosClient from './base';
import { AxiosError } from 'axios';
import { LastPost, RssItem } from '../types/common';
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
  async findAllPosts(linkIds: { linkId: number }[]) {
    try {
      const { data } = await axiosClient.post('post/in', { linkIds });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findLast(linkIds: { linkId: number }[]) {
    try {
      const { data } = await axiosClient.post('post/last', { linkIds });
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
  async countByDate(linkIds: { linkId: number }[]) {
    try {
      const { data } = await axiosClient.post('post/count/date', { linkIds });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};
