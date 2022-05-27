import { defineStore } from 'pinia';
import { Link } from '../types/common';
import { isProxy, toRaw } from 'vue';

export const useGroupStore = defineStore('group', {
  state: () => ({
    isOpenGroupEditor: false,
    isOpenLinkEditor: false,
    links: [] as Link[],
  }),
  getters: {
    linkCountMessage(state) {
      //어떻게 해야 제대로 나올까?
      if (isProxy(state)) {
        const links = toRaw(state).links;
        const res = links.length > 0 ? `(${links.length}/10)` : '';
        return res;
      }
      return '';
    },
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
  },
});

// export const useGroupStore = defineStore('group', () => {
//   const isOpenGroupEditor = ref(false);
//   const openGroupEditor = () => (isOpenGroupEditor.value = true);
//   const closeGroupEditor = () => (isOpenGroupEditor.value = false);

//   const isOpenLinkEditor = ref(false);
//   const openLinkEditor = () => (isOpenLinkEditor.value = true);
//   const closeLinkEditor = () => (isOpenLinkEditor.value = false);

//   const links: Link[] = reactive([]);
//   const initLinks = () => (links.length = 0);
//   const addLink = (v: Link) => links.push(v);
//   const deleteLink = (idx: number) => links.splice(idx, 1);

//   return {
//     isOpenGroupEditor,
//     openGroupEditor,
//     closeGroupEditor,
//     isOpenLinkEditor,
//     openLinkEditor,
//     closeLinkEditor,
//     links,
//     initLinks,
//     addLink,
//     deleteLink,
//   };
// });
