import axiosClient, { useAxiosPost } from './base';
import { AxiosError } from 'axios';
import { LastPost, Link, RssItem } from '../types/common';
import { getAgoString, getDateString } from '../plugin/dayjs';
import { delay } from '../util';
import { Ref } from 'vue';

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
    await delay();
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0 }));
    try {
      return await useAxiosPost('post/in', { linkIds: linksBundle });
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async findLast(links: { link: Link }[]): Promise<{ isLoading: Ref; data: any }> {
    await delay();
    const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0, title: link.title }));
    try {
      const { isLoading, data } = await useAxiosPost('post/last', { linkIds: linksBundle });
      console.log('findLast', { isLoading, data });
      return {
        isLoading,
        data: data.value.map((post: LastPost) => ({
          ...post,
          dateString: getDateString(new Date(post.createdAt)),
          agoString: getAgoString(new Date(post.createdAt)),
        })),
      };
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async countByDate(links: { link: Link }[]) {
    await delay();
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
function ref(arg0: any) {
  throw new Error('Function not implemented.');
}
