import { defineStore } from 'pinia';
import { Group, GroupTag, Link, Post } from '../types/common';
import GroupApi from '../api/groupApi';
import PostAPI from '../api/postApi';
import RssAPI from '../api/rssApi';

const totalTag = '전체보기';

export const useGroupStore = defineStore('group', {
  state: () => ({
    links: [] as Link[],
    groups: [] as Group[],
    groupLoading: true,
    currentGroup: {} as Group,
    tags: [] as GroupTag[],
    currentTag: totalTag,
    posts: [] as Post[],
    postLoading: true,
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
    async loadGroup(domain: string) {
      if (this.currentGroup.domain === domain) return;
      const { data, isLoading } = await GroupApi.findById(domain);
      this.groupLoading = isLoading.value;
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
        this.links,
      );
    },
    async loadPosts(links: { link: Link }[]) {
      await Promise.all(links.map(({ link }: { link: Link }) => RssAPI.scrap(link)));
      const { data, isLoading } = await PostAPI.findAllPosts(links);
      this.posts = data.value;
      this.postLoading = isLoading.value;
    },
  },
});
