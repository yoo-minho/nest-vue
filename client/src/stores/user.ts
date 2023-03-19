import { defineStore } from 'pinia';

import UserApi from '../api/userApi';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    name: '',
    profileImage: '',
  }),
  getters: {
    isExistsUser: (state) => !!state.id,
  },
  actions: {
    async fetchUser() {
      const { data: user } = await UserApi.findUser();
      this.id = user.value.id;
      this.email = user.value.email;
      this.name = user.value.name;
      this.profileImage = user.value.profileImage;
      return;
    },
  },
});
