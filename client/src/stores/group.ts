import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { Link } from '../types/common';

export const useGroupStore = defineStore('group', () => {
  const isOpenGroupEditor = ref(false);
  const openGroupEditor = () => (isOpenGroupEditor.value = true);
  const closeGroupEditor = () => (isOpenGroupEditor.value = false);

  const isOpenLinkEditor = ref(false);
  const openLinkEditor = () => (isOpenLinkEditor.value = true);
  const closeLinkEditor = () => (isOpenLinkEditor.value = false);

  const links: Link[] = reactive([]);
  const initLinks = () => (links.length = 0);
  const addLink = (v: Link) => links.push(v);
  const deleteLink = (idx: number) => links.splice(idx, 1);

  return {
    isOpenGroupEditor,
    openGroupEditor,
    closeGroupEditor,
    isOpenLinkEditor,
    openLinkEditor,
    closeLinkEditor,
    links,
    initLinks,
    addLink,
    deleteLink,
  };
});
