import { defineStore } from 'pinia';
import { Tag } from '../types/common';
import GroupApi from '../api/groupApi';
import { POST_TAG, BLOG_TAG } from '@/constants';

const totalTag = 'All';

export const useTagStore = defineStore('tag', {
  state: () => ({
    tagsLoading: true,
    tags: [] as Tag[],
    currentTag: totalTag,
  }),
  getters: {
    isTotalTag: (state) => state.currentTag === totalTag,
    NavTags: ({ tags }) => [{ index: -1, groupId: '', name: totalTag }, ...tags],
    TagNames: ({ tags }) => tags.map(({ name }) => name.toLowerCase()),
  },
  actions: {
    initTag() {
      this.currentTag = totalTag;
    },
    async fetchAllTeamTag() {
      const { data } = await GroupApi.findAllTag();
      this.tags = data.value;
      this.tagsLoading = false;
    },
    async fetchAllBlogTag() {
      this.tags = BLOG_TAG.map((v) => ({ id: v.type, name: v.type }));
      this.tagsLoading = false;
    },
    async fetchAllPostTag() {
      this.tags = POST_TAG.map((v) => ({ id: v.label, name: v.label }));
      this.tagsLoading = false;
    },
    setCurrentTag(tag?: string) {
      this.currentTag = tag || totalTag;
    },
  },
});
