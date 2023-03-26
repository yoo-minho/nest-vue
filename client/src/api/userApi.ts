import { useAxiosGet } from './base';
import { AxiosError } from 'axios';
import { LocalStorage } from 'quasar';

export default {
  async findUser() {
    try {
      console.log('findUser', LocalStorage.getItem('access-token'));
      return await useAxiosGet('user');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async loginKakao() {
    try {
      return await useAxiosGet('auth/kakao');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
  async logoutUser() {
    try {
      return await useAxiosGet('auth/logout');
    } catch (err) {
      const { message } = err as AxiosError;
      throw new Error(message);
    }
  },
};
