import { AxiosError } from 'axios';
import { useAxiosPatch } from './base';

export default {
  async updateScrapAt(linkId: number) {
    try {
      await useAxiosPatch(`link/${linkId}`);
    } catch (axiosError) {
      const { message } = axiosError as AxiosError;
      throw new Error(message);
    }
  },
};
