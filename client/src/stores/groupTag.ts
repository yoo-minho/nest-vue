import { defineStore } from 'pinia';
import { GroupTag } from '../types/common';
import GroupTagApi from '../api/groupTagApi';

export const useGroupTagStore = defineStore('groupTag', {
  state: () => ({
    tags: [] as GroupTag[],
    currentTag: {} as GroupTag,
  }),
  getters: {
    tags: (state) => state.tags,
  },
  actions: {
    async init() {
      this.tags = await GroupTagApi.findAll();
    },
  },
});
