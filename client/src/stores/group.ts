import { defineStore } from 'pinia';
import { Group, Link } from '../types/common';
import GroupApi from '../api/group';

export const useGroupStore = defineStore('group', {
  state: () => ({
    links: [] as Link[],
    groups: [] as Group[],
    currentGroup: {} as Group,
  }),
  getters: {
    linkCountMessage: (state) => (state.links.length > 0 ? `(${state.links.length}/10)` : ''),
    groupDataList: (state) => state.groups,
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
    async init() {
      this.groups = await GroupApi.findAll();
    },
    async getGroupData(id: number) {
      this.currentGroup = await GroupApi.findOne(id);
      return this.currentGroup;
    },
    async save(title: string, id: string, description: string) {
      //Todo. id 중복체크
      const groupData = {
        index: -1,
        id,
        title,
        description,
        links: this.links,
      };
      const createdIndex = await GroupApi.create(groupData);
      groupData.index = createdIndex;
      this.groups = [groupData, ...this.groups];
    },
  },
});
