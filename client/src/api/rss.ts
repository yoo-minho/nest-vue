import axiosClient from './base';

export default {
  async index(url: string) {
    const res = await axiosClient.get('rss', { params: { url } });
    return res.data;
  },
};
