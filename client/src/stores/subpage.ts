import { defineStore } from 'pinia';

export const useSubpageStore = defineStore('subpage', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    isOpenSettingSubpage: false,
    isOpenDataSubpage: false,
    stack: 'stack',
    isOpenLoginSubpage: false,
    // subpages: [
    //   {
    //     id: '#Editor',
    //     cb: () => {
    //       if (this.isOpenLinkEditor) {
    //         this.closeLinkEditor();
    //         next(false);
    //       } else {
    //         closeGroupEditor();
    //         next();
    //       }
    //     },
    //   },
    //   {
    //     id: '#Setting',
    //     cb: () => {
    //       if (isOpenDataSubpage.value) {
    //         closeStackMain();
    //         next(false);
    //       } else {
    //         closeSettingMain();
    //         next();
    //       }
    //     },
    //   },
    //   {
    //     id: '#Login',
    //     cb: () => {
    //       closeLoginSubpage();
    //       next();
    //     },
    //   },
    // ];
  }),
  getters: {},
  actions: {
    openGroupEditor() {
      this.isOpenGroupEditor = true;
    },
    closeGroupEditor() {
      this.isOpenGroupEditor = false;
    },
    closeEditor(groupCloseCb: () => void, linkCloseCb: () => void) {
      if (this.isOpenLinkEditor) {
        this.closeLinkEditor();
        linkCloseCb();
      } else {
        this.closeGroupEditor();
        groupCloseCb();
      }
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
