import { defineStore } from 'pinia';
import { Link } from '../types/common';

export const useGroupStore = defineStore('group', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    links: [] as Link[],
  }),
  getters: {
    linkCountMessage: (state) => (state.links.length > 0 ? `(${state.links.length}/10)` : ''),
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
    getOpenGraphTag() {
      return 'xxxx';
    },
  },
});
