import { defineStore } from 'pinia';
import { Tag } from '../types/common';
import GroupApi from '../api/groupApi';
import { POST_TAG } from '@/data/post-tag';

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
    async fetchAllTeamTag() {
      const { data } = await GroupApi.findAllTag();
      this.tags = data.value;
      this.tagsLoading = false;
    },
    async fetchAllBlogTag() {
      const { data } = await GroupApi.count();
      const { linkCountByPlatform: linkCountBy } = data.value;
      this.tags = linkCountBy.map((v: any) => ({ id: v.type, name: v.type, count: v._count }));
      this.tagsLoading = false;
    },
    async fetchAllPostTag() {
      console.log({ POST_TAG });
      this.tags = POST_TAG.map((v) => ({ id: v.label, name: v.label, value: v.value }));
    },
    setCurrentTag(tag?: string) {
      this.currentTag = tag || totalTag;
    },
  },
});
