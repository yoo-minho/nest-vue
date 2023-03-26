import { defineStore } from 'pinia';
import { QScrollArea } from 'quasar';

import UserApi from '../api/userApi';

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    email: '',
    name: '',
    profileImage: '',
    mainTab: '',
    isSearchMode: false,
    searchWord: '',
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
    toggleSearchMode() {
      this.isSearchMode = !this.isSearchMode;
      if (!this.isSearchMode) {
        this.searchWord = '';
      }
    },
  },
});
