import axiosClient from './base';
import { AxiosError } from 'axios';
import { RssItem } from '../types/common';

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
  async findAllPosts(linkId: number) {
    try {
      const { data } = await axiosClient.get('post', { params: { linkId } });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
  async findAllPosts2(linkIds: { linkId: number }[]) {
    try {
      const { data } = await axiosClient.post('post/in', { linkIds });
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  },
};
