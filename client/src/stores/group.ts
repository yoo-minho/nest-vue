import { defineStore } from 'pinia';
import { Group, GroupTag, Link, TabType } from '../types/common';
import GroupApi from '../api/groupApi';
import { getDateString, isSameDate } from '@/plugin/dayjs';
import { scrapOGS } from '@/hooks/useOgs';

const totalTag = 'All';
const appName = 'Teamlog';

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
    selectTab: '' as TabType,
    currentHeaderTitle: appName,
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
    isOrginalHeader: ({ currentHeaderTitle }) => currentHeaderTitle === appName,
  },
  actions: {
    initHeaderTitle() {
      this.currentHeaderTitle = appName;
    },
    changeHeaderTitle() {
      this.currentHeaderTitle = this.currentGroup.title;
    },
    handleSwipeTab(direction: 'left' | 'right', currentTab: TabType) {
      if (!this.isOrginalHeader) return; //스크롤 내렸을땐 좌우가 안 움직이도록!
      const tabs = [`GroupDetailLink`, `GroupDetailPost`, `GroupDetailStat`];
      const idx = tabs.indexOf(currentTab);
      let nextTab;
      if (direction === 'left') {
        nextTab = tabs[(idx + 1) % 3];
      } else if (direction === 'right') {
        nextTab = tabs[(idx + 2) % 3];
      }
      this.selectTab = nextTab as TabType;
    },
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
      this.linksOnEditor = [...this.linksOnEditor].map((link) => {
        if (link.id === id) {
          link = { ...link, title: ogsData.title, description: ogsData.description, imagePath: ogsData.imagePath };
        }
        return link;
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
      this.groups = [...this.groups.map((group) => (group.domain === domain ? data.value : group))];
    },
    updateCurrentGroupLinksScrapAt() {
      this.currentGroup.links = this.currentGroup.links?.map(({ link }) => {
        link.scrapAt = new Date();
        return { link };
      });
    },
    updateCurrentGroupLastPostCreatedAt({ lastPostCreatedAt }: { lastPostCreatedAt: Date }) {
      if (isSameDate(this.currentGroup.lastPostCreatedAt, lastPostCreatedAt)) return;
      this.currentGroup.lastPostCreatedAt = lastPostCreatedAt;
      const domain = this.currentGroup.domain;
      this.groups = [...this.groups].map((group) =>
        group.domain === domain ? { ...group, lastPostCreatedAt } : group,
      );
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
