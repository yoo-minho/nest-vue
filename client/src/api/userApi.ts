import { useAxiosGet } from './base';
import { AxiosError } from 'axios';

export default {
  async findUser() {
    try {
      return await useAxiosGet('user');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
};
