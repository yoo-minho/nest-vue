import { defineStore } from 'pinia';
import { Group, GroupTag, Link } from '../types/common';
import GroupApi from '../api/groupApi';

const totalTag = '전체보기';

export const useGroupStore = defineStore('group', {
  state: () => ({
    linksOnEditor: [] as Link[],
    groupsLoading: true,
    groups: [] as Group[],
    groupLoading: true,
    currentGroup: {} as Group,
    tagsLoading: true,
    tags: [] as GroupTag[],
    currentTag: totalTag,
  }),
  getters: {
    linkCountMessage: ({ linksOnEditor: links }) => (links.length > 0 ? `(${links.length}/10)` : ''),
    isTotalTag: (state) => state.currentTag === totalTag,
    NavTags: ({ tags }) => [{ index: -1, groupId: '', name: totalTag }, ...tags],
    TagNames: ({ tags }) => tags.map(({ name }) => name.toLowerCase()),
  },
  actions: {
    initLinks() {
      this.linksOnEditor.length = 0;
    },
    addLink(v: Link) {
      this.linksOnEditor.push(v);
    },
    deleteLink(idx: number) {
      this.linksOnEditor.splice(idx, 1);
    },
    async fetchAllGroup() {
      const { data } = await GroupApi.findAll();
      this.groups = data.value;
      this.groupsLoading = false;
    },
    async fetchByTag(tag: string) {
      const { data } = await GroupApi.findByTag(tag);
      this.groups = data.value;
      this.groupsLoading = false;
    },
    async fetchAllTag() {
      const { data } = await GroupApi.findAllTag();
      this.tags = data.value;
      this.tagsLoading = false;
    },
    setCurrentTag(tag: string) {
      this.currentTag = tag;
    },
    async fetchGroup(domain: string) {
      if (this.currentGroup.domain === domain) {
        this.groupLoading = false;
        return;
      }
      const { data } = await GroupApi.findById(domain);
      this.groupLoading = false;
      this.currentGroup = data.value;
    },
    async save(title: string, domain: string, description: string, tags: string[]) {
      await GroupApi.create(
        {
          domain,
          title,
          description,
          tags,
        },
        this.linksOnEditor,
      );
    },
  },
});
