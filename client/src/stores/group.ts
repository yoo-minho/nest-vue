import { defineStore } from 'pinia';
import { Group, Link } from '../types/common';
import GroupApi from '../api/group';

export const useGroupStore = defineStore('group', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    links: [] as Link[],
    groups: [] as Group[],
    currentGroup: {} as Group,
  }),
  getters: {
    linkCountMessage: (state) => (state.links.length > 0 ? `(${state.links.length}/10)` : ''),
    groupDataList: (state) => state.groups,
    currentGroupData: (state) => state.currentGroup,
  },
  actions: {
    openGroupEditor() {
      this.isOpenGroupEditor = true;
    },
    closeGroupEditor() {
      this.isOpenGroupEditor = false;
    },
    openLinkEditor() {
      this.isOpenLinkEditor = true;
    },
    closeLinkEditor() {
      this.isOpenLinkEditor = false;
    },
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
    async selectGroup(id: number) {
      this.currentGroup = await GroupApi.findOne(id);
    },
    async save(title: string, description: string) {
      const groupData = {
        index: -1,
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
