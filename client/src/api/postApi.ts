import { ref } from 'vue';
import { AxiosError } from 'axios';

import axiosClient, { useAxiosGetArray } from './base';
import { ErrorMessage, AxiosErrorType } from './error';

import { LastPost, LinkWrap, RssItem } from '@/types/common';
import { getAgoString, getDateString } from '@/plugin/dayjs';

const getIds = (links: LinkWrap[]) => links.map(({ link }) => link.id);

export default {
  async createPosts(linkId: number, items: RssItem[]) {
    if (items.length === 0) return;
    try {
      await axiosClient.post('post', { linkId, items });
    } catch (e) {
      throw new Error(ErrorMessage(e as AxiosErrorType));
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
      const { isLoading, data } = await useAxiosGetArray('post/last', { params: { linkIds: getIds(links) } });
      const _data = data.value.map((post: LastPost) => ({
        ...post,
        dateString: getDateString(post.createdAt),
        agoString: getAgoString(post.createdAt),
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
      return await useAxiosGetArray('post/count/date', { params: { linkIds: getIds(links) } });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
};
