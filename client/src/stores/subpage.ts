import { defineStore } from 'pinia';

export const useSubpageStore = defineStore('subpage', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    isOpenSettingSubpage: false,
    isOpenDataSubpage: false,
    stack: 'stack',
    isOpenLoginSubpage: false,
  }),
  getters: {},
  actions: {
    openGroupEditor() {
      this.isOpenGroupEditor = true;
    },
    closeGroupEditor() {
      console.log('closeGroupEditor');
      this.isOpenGroupEditor = false;
    },
    openLinkEditor() {
      this.isOpenLinkEditor = true;
    },
    closeLinkEditor() {
      this.isOpenLinkEditor = false;
    },
    openSettingMain() {
      this.isOpenSettingSubpage = true;
    },
    closeSettingMain() {
      this.isOpenSettingSubpage = false;
    },
    openStackMain() {
      this.stack = 'stack';
      this.isOpenDataSubpage = true;
    },
    openPlatformMain() {
      this.stack = 'platform';
      this.isOpenDataSubpage = true;
    },
    closeStackMain() {
      this.isOpenDataSubpage = false;
    },
    openLoginSubpage() {
      this.isOpenLoginSubpage = true;
    },
    closeLoginSubpage() {
      this.isOpenLoginSubpage = false;
    },
  },
});
