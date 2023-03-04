import { defineStore, storeToRefs } from 'pinia';
import { DaysAllCounts, DaysCount, LastPost, linkCount, LinkWrap, OrderType, Post } from '../types/common';
import { isTodayByDate } from '@/plugin/dayjs';
import { useGroupStore } from './group';
import { skipBlogName } from '@/util/NameUtil';

import PostAPI from '../api/postApi';
import RssAPI from '../api/rssApi';
import GroupAPI from '@/api/groupApi';
import { delay } from '@/util/CommUtil';

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const { updateCurrentGroupLastPostCreatedAt, updateCurrentGroupLinksScrapAt } = groupStore;

const MMM = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day = [0, 1, 2, 3, 4, 5, 6];

export const usePostStore = defineStore('post', {
  state: () => ({
    posts: [] as Post[],
    postLoading: false,
    jandis: [] as DaysCount[],
    jandiLoading: false,
    lastPosts: [] as LastPost[],
    lastLoading: false,
    countPostGroupByLinkId: [] as linkCount[],
    scrapLoading: false,
    searchWord: '',
    searchKeyword: '',
  }),
  getters: {
    titleOfPostCounting(): string[] {
      return this.countPostGroupByLinkId
        .map(({ linkId }) => currentGroup.value.links?.find(({ link }) => link.id === linkId)?.link.title || '')
        .map((v) => skipBlogName(v));
    },
    countOfPostCounting(): number[] {
      return this.countPostGroupByLinkId.map(({ count }) => count);
    },
    activeJandis: ({ jandis }) => jandis.filter(({ count }) => count > 0) || [],
    activeJandisCount() {
      const _active = this.activeJandis as DaysCount[];
      return _active.reduce((total: number, val: DaysCount) => total + val.count, 0);
    },
    nextPostingDay() {
      return ((c: number) => (c > 0 ? `${Math.round((90 / c) * 100) / 100}일` : '-'))(+this.activeJandisCount);
    },
    manyPostingMMM() {
      const _active = this.activeJandis as DaysCount[];
      if (_active.length === 0) return '-';
      const dayOfWeek = day
        .map((d) => ({ day: d, count: _active.filter(({ day }) => day === d).length }))
        .sort((x, y) => y.count - x.count);
      return MMM[dayOfWeek[0].day];
    },
  },
  actions: {
    async scrapPostsAndAction() {
      const { id: groupId, links } = currentGroup.value;
      if (!links) return;
      this.initPostData({ post: false });
      await this.scrapPosts(links, false, groupId);
    },
    initPostData({ post = true } = {}) {
      if (post) {
        this.posts = [];
        this.postLoading = true;
      }
      this.jandis = [];
      this.jandiLoading = true;
      this.lastPosts = [];
      this.lastLoading = true;
    },
    async scrapPosts(links: LinkWrap[], isScrapOncePerDay: boolean, groupId?: number) {
      if (links.length === 0) return;

      let scrapLinks = [...links];
      if (isScrapOncePerDay) {
        scrapLinks = links.filter(({ link }: LinkWrap) => !isTodayByDate(link.scrapAt));
      }

      if (scrapLinks.length === 0) return;

      try {
        this.scrapLoading = true;
        await Promise.allSettled([...scrapLinks.map(({ link }: LinkWrap) => RssAPI.scrap(link)), delay(1000)]);
        //link들의 lastPostCreatedAt 중 max를 group에 업데이트함
        console.log('scrapPosts finally 1');
        const { lastPostCreatedAt } = await GroupAPI.updateLastPostCreateAt(groupId);
        console.log('scrapPosts finally 2', { groupId, lastPostCreatedAt });
        updateCurrentGroupLastPostCreatedAt({ lastPostCreatedAt });
        updateCurrentGroupLinksScrapAt();
      } catch (e) {
        throw new Error(String(e));
      } finally {
        this.scrapLoading = false;
      }
    },
    async fetchPosts(page?: number) {
      this.postLoading = this.posts.length > 0 ? false : true;
      const isFirstPage = !page || page === 1;
      const { data } = await PostAPI.findAllPosts(currentGroup.value.links || [], page);
      this.posts = isFirstPage ? data.value : [...this.posts, ...data.value];
      this.postLoading = false;
      return data.value.length > 0;
    },
    async fetchSearchPosts(page?: number) {
      if (!this.searchWord || this.searchWord.length < 1) {
        this.postLoading = false;
        this.searchKeyword = '';
        return;
      }
      this.postLoading = true;
      const isFirstPage = !page || page === 1;
      const { data } = await PostAPI.searchPosts(currentGroup.value.links, this.searchWord, page);
      await delay(1000);
      const searchWords = this.searchWord.split('|').filter((word) => !!word);
      const highlight = (t: string) => {
        searchWords.forEach((word) => (t = t.replace(new RegExp(word, 'ig'), (v) => `<mark>${v}</mark>`)));
        return t;
      };
      const convData = data.value.map((v: { title: string }) => ({ ...v, title: highlight(v.title) }));
      this.posts = isFirstPage ? convData : [...this.posts, ...convData];
      this.postLoading = false;
      return data.value.length > 0;
    },
    async fetchJandis(links: LinkWrap[]) {
      if (links.length === 0) return;
      this.jandiLoading = true;
      const { data } = await PostAPI.countByDate(links);
      this.jandis = [...data.value].map((v: DaysAllCounts) => ({
        ...v,
        count: v.count ? v.count['totalCount'] || 0 : 0,
      }));
      this.jandiLoading = false;
    },
    async fetchLastPosts(links: LinkWrap[], order: OrderType) {
      if (links.length === 0) return;
      this.lastLoading = true;
      const { data } = await PostAPI.findLast(links);
      const time = (date: string) => new Date(date).getTime();
      this.lastPosts = [...data.value].sort((x, y) => order * (time(y.createdAt) - time(x.createdAt)));
      this.lastLoading = false;
    },
    async fetchCountGroupById(links: LinkWrap[]) {
      if (links.length === 0) return;
      const { data } = await PostAPI.findCountGroupById(links);
      this.countPostGroupByLinkId = data.value;
    },
  },
});
