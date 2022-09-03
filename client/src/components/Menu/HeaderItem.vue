<script setup lang="ts">
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import { usePostStore } from '@/stores/post';
import { useGroupStore } from '@/stores/group';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';

const postStore = usePostStore();

const { scrapLoading } = storeToRefs(postStore);
const { initPostData, scrapPosts } = postStore;

const subpageStore = useSubpageStore();
const { openGroupEditor, openSettingMain } = subpageStore;

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const { updateMinScrapAt } = groupStore;

const router = useRouter();

interface HeaderOption {
  close?: () => void;
  back?: () => void;
  logo?: boolean;
  title?: string;
  refresh?: boolean;
  editor?: boolean;
  setting?: boolean;
  save?: () => void;
}

const props = defineProps<HeaderOption>();
const { logo, editor, setting } = toRaw(props);
const $q = useQuasar();
const reload = () => {
  router.replace({ name: 'Group' });
};
const scrapPostsAndAction = async () => {
  const links = currentGroup.value.links;
  if (!links) return;

  if (scrapLoading.value) {
    $q.notify({ type: 'nagative', message: 'Wait for a moment!' });
    return;
  }

  initPostData();
  await scrapPosts(links, false);
  updateMinScrapAt();
  $q.notify({ type: 'positive', message: 'Refresh Competed!' });
};
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn v-if="close" flat round dense icon="close" @click="close" />
      <q-btn v-if="back" flat round dense icon="keyboard_backspace" @click="back" />
      <q-toolbar-title v-if="logo" class="logo-font logo-style logo-common q-ml-sm" @click="reload">
        onebylog
      </q-toolbar-title>
      <q-toolbar-title v-if="title">{{ title }}</q-toolbar-title>

      <q-btn v-if="refresh" icon="sync" flat round dense @click="scrapPostsAndAction" />
      <q-btn v-if="editor" icon="add_circle_outline" flat round dense @click="openGroupEditor" />
      <q-btn v-if="setting" icon="menu" flat round dense @click="openSettingMain" />
      <q-btn v-if="save" flat round dense icon="done" @click="save" />
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.logo-font {
  font-family: Arial;
}
.logo-common {
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
