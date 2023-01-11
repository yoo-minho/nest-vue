import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { Group, GroupTag, Link } from '../types/common';
import GroupApi from '../api/groupApi';
import { getDateString, isSameDate } from '@/plugin/dayjs';
import { scrapOGS } from '@/hooks/useOgs';

const totalTag = 'All';

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
    minScrapAt: ({ currentGroup }) => {
      if (!currentGroup.links) return;
      return (
        getDateString(
          currentGroup.links
            .map(({ link }) => ({ time: link.scrapAt?.getTime() || 0, scrapAt: link.scrapAt }))
            .sort((x, y) => x.time - y.time)
            .splice(0, 1)[0].scrapAt,
        ) || 'fail to scrap ...'
      );
    },
  },
  actions: {
    initLinks(data?: Link[]) {
      if (!data) {
        this.linksOnEditor.length = 0;
      } else {
        this.linksOnEditor = data;
      }
    },
    addLink(v: Link) {
      this.linksOnEditor.push(v);
    },
    deleteLink(id?: number) {
      if (!id) return;
      this.linksOnEditor = this.linksOnEditor.filter((v) => v.id !== id);
    },
    async refreshLink(id?: number, url?: string) {
      if (!id || !url) return;
      const ogsData = await scrapOGS(url);
      if (ogsData.error) return;
      this.linksOnEditor.forEach((link) => {
        if (link.id === id) {
          link.title = ogsData.title;
          link.description = ogsData.description;
          link.imagePath = ogsData.imagePath;
        }
      });
    },
    initGroupData() {
      this.groupLoading = true;
      this.currentGroup = {} as Group;
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
    async refreshGroup(domain: string) {
      this.groupLoading = true;
      const { data } = await GroupApi.findById(domain);
      this.groupLoading = false;
      this.currentGroup = data.value;

      //Todo 왜 갱신이 안될까?
      this.groups = toRaw(this.groups).map((group) => (group.domain === domain ? data.value : group));
      console.log('groups', this.groups);
    },
    updateCurrentGroupLinksScrapAt() {
      this.currentGroup.links = this.currentGroup.links?.map(({ link }) => {
        link.scrapAt = new Date();
        return { link };
      });
    },
    updateCurrentGroupLastPostCreatedAt({ lastPostCreatedAt }: { lastPostCreatedAt: Date }) {
      if (isSameDate(this.currentGroup.lastPostCreatedAt, lastPostCreatedAt)) {
        console.log('Todo. SKIP POST', { lastPostCreatedAt });
        return;
      }
      this.currentGroup.lastPostCreatedAt = lastPostCreatedAt;
    },
    async save(title: string, domain: string, description: string, tags: string[]) {
      await GroupApi.create(
        {
          domain,
          title,
          description,
        },
        tags,
        this.linksOnEditor,
      );
    },
    async fix(id: number, title: string, domain: string, description: string, tags: string[]) {
      await GroupApi.update(
        id,
        {
          domain,
          title,
          description,
        },
        tags,
        this.linksOnEditor,
      );
    },
  },
});
