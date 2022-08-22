import { defineStore } from 'pinia';

export const useSubpageStore = defineStore('subpage', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    isOpenSettingMain: false,
    isOpenStackMain: false,
    stack: 'stack',
  }),
  getters: {},
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
    openSettingMain() {
      this.isOpenSettingMain = true;
    },
    closeSettingMain() {
      console.log('closeSettingMain', this.isOpenSettingMain);
      this.isOpenSettingMain = false;
    },
    openStackMain() {
      this.stack = 'stack';
      this.isOpenStackMain = true;
    },
    openPlatformMain() {
      this.stack = 'platform';
      this.isOpenStackMain = true;
    },
    closeStackMain() {
      this.isOpenStackMain = false;
    },
  },
});
