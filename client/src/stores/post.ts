import { defineStore } from 'pinia';
import { DaysAllCounts, DaysCount, LastPost, LinkWrap, OrderType, Post } from '../types/common';
import PostAPI from '../api/postApi';
import RssAPI from '../api/rssApi';

import { isTodayByDate } from '@/plugin/dayjs';

const MMM = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day = [0, 1, 2, 3, 4, 5, 6];
const countKey = (linkId: number) => (linkId > 0 ? `linkCountBy${linkId}` : 'totalCount');

export const usePostStore = defineStore('post', {
  state: () => ({
    scrapLoading: false,
    posts: [] as Post[],
    postLoading: false,
    jandis: [] as DaysCount[],
    jandiLoading: false,
    lastPosts: [] as LastPost[],
    lastLoading: false,
  }),
  getters: {
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
      const dayOfWeek = day
        .map((d) => ({ day: d, count: _active.filter(({ day }) => day === d).length }))
        .sort((x, y) => x.count - y.count)[0].day;
      return MMM[dayOfWeek] || '-';
    },
  },
  actions: {
    initPostData() {
      this.posts = [];
      this.postLoading = true;
      this.jandis = [];
      this.lastPosts = [];
    },
    async scrapPosts(links: LinkWrap[], isScrapOncePerDay: boolean) {
      if (links.length === 0) return;
      this.scrapLoading = true;
      // await delay(1000);
      try {
        await Promise.all(
          links
            .filter(({ link }: LinkWrap) => !(isScrapOncePerDay && isTodayByDate(link.scrapAt)))
            .map(({ link }: LinkWrap) => RssAPI.scrap(link)),
        );
      } catch (e) {
        throw new Error(String(e));
      } finally {
        this.scrapLoading = false;
      }
    },
    async fetchPosts(links: LinkWrap[]) {
      if (links.length === 0) return;

      this.postLoading = this.posts.length === 0;
      if (this.postLoading === false) return;

      const { data } = await PostAPI.findAllPosts(links);
      this.posts = data.value;
      this.postLoading = false;
    },
    async fetchJandis(links: LinkWrap[], linkId: number) {
      if (links.length === 0) return;

      this.jandiLoading = this.jandis.length === 0;
      if (this.jandiLoading === false) return;

      const { data, isLoading } = await PostAPI.countByDate(links);
      this.jandis = data.value.map((v: DaysAllCounts) => ({
        ...v,
        count: v.count ? v.count[countKey(linkId)] || 0 : 0,
      }));
      this.jandiLoading = isLoading.value;
    },
    async fetchLastPosts(links: LinkWrap[], order: OrderType) {
      if (links.length === 0) return;

      this.lastLoading = this.lastPosts.length === 0;
      if (this.lastLoading === false) return;

      const { data, isLoading } = await PostAPI.findLast(links);
      const time = (date: string) => new Date(date).getTime();
      this.lastPosts = [...data.value].sort((x, y) => order * (time(y.createdAt) - time(x.createdAt)));
      this.lastLoading = isLoading.value;
    },
  },
});
