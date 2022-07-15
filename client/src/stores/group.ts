import { defineStore } from 'pinia';
import { Group, Link } from '../types/common';
import GroupApi from '../api/groupApi';

export const useGroupStore = defineStore('group', {
  state: () => ({
    links: [] as Link[],
    groups: [] as Group[],
    currentGroup: {} as Group,
  }),
  getters: {
    linkCountMessage: (state) => (state.links.length > 0 ? `(${state.links.length}/10)` : ''),
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
    async existsId(id: string) {
      return Object.keys((await GroupApi.findById(id)) || {}).length > 0;
    },
    async getGroupData(id: string) {
      if (this.currentGroup.id === id) {
        return this.currentGroup;
      }
      const currentData = await GroupApi.findById(id);
      let { today = 0, total = 0 } = currentData;
      today++;
      total++;
      await GroupApi.updateCount(id, { today, total });
      this.currentGroup = { ...currentData, today: today, total: total };
      return this.currentGroup;
    },
    async save(title: string, id: string, description: string, tags: string[]) {
      const groupData = {
        index: -1,
        id,
        title,
        description,
        links: this.links,
        tags,
        created_at: new Date(),
        today: 0,
        total: 0,
      };
      await GroupApi.create(groupData);
    },
  },
});
