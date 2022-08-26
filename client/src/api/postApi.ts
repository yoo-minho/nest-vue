import { ref } from 'vue';
import { AxiosError } from 'axios';

import axiosClient, { useAxiosGetArray, useAxiosPost } from './base';

import { LastPost, LinkWrap, RssItem } from '@/types/common';
import { getAgoString, getDateString } from '@/plugin/dayjs';

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
  async findAllPosts(links: LinkWrap[]) {
    try {
      return await useAxiosGetArray('post', {
        params: { linkIds: links.map(({ link }) => link.id) },
      });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findLast(links: LinkWrap[]) {
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0, title: link.title }));
    try {
      const { isLoading, data } = await useAxiosPost('post/last', { linkIds: linksBundle });
      const _data = data.value.map((post: LastPost) => ({
        ...post,
        dateString: getDateString(new Date(post.createdAt)),
        agoString: getAgoString(new Date(post.createdAt)),
      }));
      return {
        isLoading,
        data: ref(_data),
      };
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async countByDate(links: LinkWrap[]) {
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0, title: link.title }));
    try {
      return await useAxiosPost('post/count/date', { linkIds: linksBundle });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
};
