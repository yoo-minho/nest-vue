import { defineStore } from 'pinia';
import { DaysAllCounts, DaysCount, LastPost, LinkWrap, OrderType, Post } from '../types/common';
import PostAPI from '../api/postApi';
import RssAPI from '../api/rssApi';
import GroupAPI from '@/api/groupApi';
import { isTodayByDate } from '@/plugin/dayjs';
import { useGroupStore } from './group';

const groupStore = useGroupStore();
const { updateCurrentGroupLastPostCreatedAt, updateCurrentGroupLinksScrapAt } = groupStore;

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
      if (_active.length === 0) return '-';
      const dayOfWeek = day
        .map((d) => ({ day: d, count: _active.filter(({ day }) => day === d).length }))
        .sort((x, y) => x.count - y.count)[0].day;
      return MMM[dayOfWeek];
    },
  },
  actions: {
    initPostData() {
      this.posts = [];
      this.postLoading = true;
      this.jandis = [];
      this.jandiLoading = true;
      this.lastPosts = [];
      this.lastLoading = true;
    },
    async scrapPosts(links: LinkWrap[], isScrapOncePerDay: boolean, groupId?: number) {
      if (links.length === 0) {
        console.log('SKIP scrapPosts');
        return;
      }

      this.scrapLoading = true;
      const scrapLinks = links.filter(({ link }: LinkWrap) => !(isScrapOncePerDay && isTodayByDate(link.scrapAt)));
      try {
        await Promise.all(scrapLinks.map(({ link }: LinkWrap) => RssAPI.scrap(link)));
      } catch (e) {
        throw new Error(String(e));
      } finally {
        this.scrapLoading = false;

        //link들의 lastPostCreatedAt 중 max를 group에 업데이트함
        const { lastPostCreatedAt } = await GroupAPI.updateLastPostCreateAt(groupId);
        updateCurrentGroupLastPostCreatedAt({ lastPostCreatedAt });
        if (scrapLinks.length > 0) {
          updateCurrentGroupLinksScrapAt();
        }
      }
    },
    async fetchPosts(links: LinkWrap[]) {
      if (links.length === 0) {
        console.log('SKIP fetchPosts');
        return;
      }

      this.postLoading = this.posts.length > 0 ? false : true;
      const { data } = await PostAPI.findAllPosts(links);

      this.posts = data.value;
      this.postLoading = false;
    },
    async fetchJandis(links: LinkWrap[], linkId: number) {
      if (links.length === 0) {
        console.log('SKIP fetchJandis');
        return;
      }

      this.jandiLoading = true;
      const { data } = await PostAPI.countByDate(links);
      this.jandis = data.value.map((v: DaysAllCounts) => ({
        ...v,
        count: v.count ? v.count[countKey(linkId)] || 0 : 0,
      }));
      this.jandiLoading = false;
    },
    async fetchLastPosts(links: LinkWrap[], order: OrderType) {
      if (links.length === 0) {
        console.log('SKIP fetchLastPosts');
        return;
      }

      this.lastLoading = true;
      const { data } = await PostAPI.findLast(links);
      const time = (date: string) => new Date(date).getTime();
      this.lastPosts = [...data.value].sort((x, y) => order * (time(y.createdAt) - time(x.createdAt)));
      this.lastLoading = false;
    },
  },
});
