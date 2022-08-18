import { defineStore } from 'pinia';
import { DaysAllCounts, DaysCount, Group, GroupTag, LastPost, Link, Post } from '../types/common';
import GroupApi from '../api/groupApi';
import PostAPI from '../api/postApi';
import RssAPI from '../api/rssApi';

const totalTag = '전체보기';
const MMM = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day = [0, 1, 2, 3, 4, 5, 6];
const countKey = (linkId: number) => (linkId > 0 ? `linkCountBy${linkId}` : 'totalCount');

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
    posts: [] as Post[],
    postLoading: true,
    jandis: [] as DaysCount[],
    jandiLoading: true,
    lastPosts: [] as LastPost[],
    lastLoading: true,
  }),
  getters: {
    linkCountMessage: ({ linksOnEditor: links }) => (links.length > 0 ? `(${links.length}/10)` : ''),
    isTotalTag: (state) => state.currentTag === totalTag,
    NavTags: ({ tags }) => [{ index: -1, groupId: '', name: totalTag }, ...tags],
    TagNames: ({ tags }) => tags.map(({ name }) => name.toLowerCase()),
    activeJandis: ({ jandis }) => jandis.filter(({ count }) => count > 0) || [],
    activeJandisCount() {
      const _active = this.activeJandis as DaysCount[];
      return _active.reduce((total: number, val: DaysCount) => total + val.count, 0);
    },
    nextPostingDay() {
      const _count = this.activeJandisCount as number;
      return ((c: number) => (c > 0 ? `${Math.round((90 / c) * 100) / 100}일` : '-'))(_count);
    },
    manyPostingMMM() {
      const _active = this.activeJandis as DaysCount[];
      const dayOfWeek = day
        .map((d) => ({ day: d, count: _active.filter(({ day }) => day === d).length }))
        .sort((x, y) => x.count - y.count)[0].day;
      return MMM[dayOfWeek] || '-';
    },
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
    async loadAllGroup() {
      const { data } = await GroupApi.findAll();
      this.groups = data.value;
      this.groupsLoading = false;
    },
    async getByTag(tag: string) {
      const { data } = await GroupApi.findByTag(tag);
      this.groups = data.value;
      this.groupsLoading = false;
    },
    async loadAllTag() {
      const { data } = await GroupApi.findAllTag();
      this.tags = data.value;
      this.tagsLoading = false;
    },
    setCurrentTag(tag: string) {
      this.currentTag = tag;
    },
    async loadGroup(domain: string) {
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
    async loadPosts(links: { link: Link }[]) {
      this.postLoading = true;
      await Promise.all(links.map(({ link }: { link: Link }) => RssAPI.scrap(link)));
      console.log('xxxxxxxxxxxxxxxxxx');
      const { data, isLoading } = await PostAPI.findAllPosts(links);
      this.posts = data.value;
      console.log({ posts: this.posts });
      this.postLoading = isLoading.value;
    },
    async loadJandis(links: { link: Link }[], linkId: number) {
      this.jandiLoading = true;
      const { data, isLoading } = await PostAPI.countByDate(links);
      this.jandis = data.value.map((v: DaysAllCounts) => ({
        ...v,
        count: v.count ? v.count[countKey(linkId)] || 0 : 0,
      }));
      this.jandiLoading = isLoading.value;
    },
    async loadLastPosts(links: { link: Link }[], order: 1 | -1) {
      this.lastLoading = true;
      const { data, isLoading } = await PostAPI.findLast(links);
      const time = (date: string) => new Date(date).getTime();
      this.lastPosts = [...data.value].sort((x, y) => order * (time(y.createdAt) - time(x.createdAt)));
      this.lastLoading = isLoading.value;
    },
  },
});
