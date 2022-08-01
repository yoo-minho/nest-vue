import { defineStore } from 'pinia';
import { Group, GroupTag, Link } from '../types/common';
import GroupApi from '../api/groupApi';

const totalTag = '전체보기';

export const useGroupStore = defineStore('group', {
  state: () => ({
    links: [] as Link[],
    groups: [] as Group[],
    currentGroup: {} as Group,
    tags: [] as GroupTag[],
    currentTag: totalTag,
  }),
  getters: {
    linkCountMessage: ({ links }) => (links.length > 0 ? `(${links.length}/10)` : ''),
    isTotalTag: (state) => state.currentTag === totalTag,
    NavTags: ({ tags }) => [{ index: -1, groupId: '', name: totalTag }, ...tags],
    TagNames: ({ tags }) => tags.map(({ name }) => name.toLowerCase()),
  },
  actions: {
    initLinks() {
      this.links.length = 0;
    },
    addLink(v: Link) {
      this.links.push(v);
    },
    deleteLink(idx: number) {
      this.links.splice(idx, 1);
    },
    async getAll() {
      this.groups = await GroupApi.findAll();
    },
    async getByTag(tag: string) {
      this.groups = await GroupApi.findByTag(tag);
    },
    async getAllTag() {
      this.tags = await GroupApi.findAllTag();
    },
    setCurrentTag(tag: string) {
      this.currentTag = tag;
    },
    async getGroupData(domain: string) {
      if (this.currentGroup.domain === domain) {
        return this.currentGroup;
      }
      return await GroupApi.findById(domain);
    },
    async save(title: string, domain: string, description: string, tags: string[]) {
      await GroupApi.create(
        {
          domain,
          title,
          description,
          tags,
        },
        this.links,
      );
    },
  },
});
