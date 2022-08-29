import { ref } from 'vue';
import { AxiosError } from 'axios';

import axiosClient, { useAxiosGetArray } from './base';

import { LastPost, LinkWrap, RssItem } from '@/types/common';
import { getAgoString, getDateString } from '@/plugin/dayjs';

const getIds = (links: LinkWrap[]) => links.map(({ link }) => link.id);

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
      return await useAxiosGetArray('post', { params: { linkIds: getIds(links) } });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findLast(links: LinkWrap[]) {
    try {
      const { isLoading, data } = await useAxiosGetArray('post/last', { linkIds: getIds(links) });
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
    try {
      return await useAxiosGetArray('post/count/date', { linkIds: getIds(links) });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
};
