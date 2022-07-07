import { defineStore } from 'pinia';
import { CountGroup, GroupTag } from '../types/common';
import GroupTagApi from '../api/groupTagApi';

export const useGroupTagStore = defineStore('groupTag', {
  state: () => ({
    tags: [] as GroupTag[],
    currentTag: {} as GroupTag,
  }),
  getters: {
    countGroupByTag: (state) => {
      const countBy = state.tags.reduce((total: CountGroup, { name }) => {
        total[name] = (total[name] || 0) + 1;
        return total;
      }, {});
      return Object.entries(countBy)
        .sort(([, a], [, b]) => b - a)
        .map(([k, v]) => ({ tag: k, count: v }));
    },
  },
  actions: {
    async getAll() {
      this.tags = await GroupTagApi.findAll();
    },
  },
});
