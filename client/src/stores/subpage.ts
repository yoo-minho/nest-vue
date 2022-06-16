import { defineStore } from 'pinia';

export const useSubpageStore = defineStore('subpage', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    isOpenSettingMain: false,
    isOpenStackMain: false,
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
      this.isOpenSettingMain = false;
    },
    openStackMain() {
      this.isOpenStackMain = true;
    },
    closeStackMain() {
      this.isOpenStackMain = false;
    },
  },
});
