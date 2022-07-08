import { defineStore } from 'pinia';
import { CountGroup, GroupTag } from '../types/common';
import GroupTagApi from '../api/groupTagApi';

const totalTag = '전체보기';

export const useGroupTagStore = defineStore('groupTag', {
  state: () => ({
    tags: [] as GroupTag[],
    currentTag: totalTag,
  }),
  getters: {
    countGroupByTag: (state) => {
      const countBy = state.tags.reduce((total: CountGroup, { name }) => {
        total[name] = (total[name] || 0) + 1;
        return total;
      }, {});

      const tags = Object.entries(countBy)
        .sort(([, a], [, b]) => b - a)
        .map(([k, v]) => ({ tag: k, count: v }));
      return [{ tag: totalTag, count: -1 }, ...tags];
    },
    activeTags: (state): string[] => {
      const unique = (v: string, idx: number, self: string[]) => self.indexOf(v) === idx;
      return state.tags.map((tag) => tag.name).filter(unique);
    },
    isTotalTag: (state) => {
      return state.currentTag === totalTag;
    },
  },
  actions: {
    async getAll() {
      this.tags = await GroupTagApi.findAll();
    },
    setCurrentTag(tag: string) {
      this.currentTag = tag;
    },
  },
});
