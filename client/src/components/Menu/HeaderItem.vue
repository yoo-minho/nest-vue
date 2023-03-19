<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import { useGroupStore } from '@/stores/group';
import { useUserStore } from '@/stores/user';
import { showBottomSheet } from '@/hooks/useSnsBottomSheeet';
import { storeToRefs } from 'pinia';
import { QScrollArea } from 'quasar';
import { onMounted } from 'vue';

const subpageStore = useSubpageStore();
const { openSettingMain, openGroupEditor, openLoginSubpage } = subpageStore;
const groupStore = useGroupStore();
const { currentHeaderTitle, isOrginalHeader, currentGroup } = storeToRefs(groupStore);
const { initGroupData, initLinks } = groupStore;
const userStore = useUserStore();
const { fetchUser } = userStore;
const { isExistsUser, profileImage } = storeToRefs(userStore);

const router = useRouter();
const route = useRoute();

interface HeaderOption {
  type: 'DEFAULT' | 'EDITOR' | 'SETTING';
  close?: () => void;
  back?: () => void;
  save?: () => void;
  title?: string;
  refresh?: boolean;
  editor?: boolean;
  fix?: boolean;
  scrollAreaRef?: QScrollArea;
}

const props = defineProps<HeaderOption>();
const isDev = process.env.mode === 'development';
const isDefaultType = props.type === 'DEFAULT';

onMounted(() => {
  fetchUser();
});

const reload = () => {
  if (route.name === 'Group') {
    router.go(0);
    return;
  }
  if (isOrginalHeader.value) {
    router.replace({ name: 'Group', query: {} });
  } else {
    props.scrollAreaRef?.setScrollPosition('vertical', 0, 300);
  }
};
const _openGroupEditor = () => {
  router.push({ hash: '#Editor' });
  initGroupData();
  initLinks();
  openGroupEditor();
};
const _openGroupFixEditor = () => {
  router.push({ hash: '#Fix' });
  initLinks();
  openGroupEditor();
};
const _openSettingMain = () => {
  router.push({ hash: '#Setting' });
  openSettingMain();
};
const _openLoginSubpage = () => {
  router.push({ hash: '#Login' });
  openLoginSubpage();
};
const logoPath = new URL(`../../assets/white_logo.png`, import.meta.url).toString();
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar>
      <q-btn v-if="close" flat round dense icon="close" @click="close" />
      <q-btn v-if="back" flat round dense icon="keyboard_backspace" @click="back" />
      <q-toolbar-title
        v-if="isDefaultType"
        :class="`logo ${isOrginalHeader ? 'original-name' : 'group-name'}`"
        @click="reload"
      >
        <q-avatar rounded size="28px">
          <q-img :src="logoPath" no-spinner loading="eager" />
        </q-avatar>
        <span class="q-ml-sm">{{ currentHeaderTitle }}</span>
      </q-toolbar-title>
      <q-toolbar-title v-if="title">{{ title }}</q-toolbar-title>
      <q-btn v-if="isDefaultType" icon="search" flat round dense @click="() => router.push({ name: 'GroupSearch' })" />
      <q-btn v-if="editor && isDev" icon="add_circle_outline" flat round dense @click="_openGroupEditor" />
      <q-btn v-if="fix && isDev" icon="mode_edit_outline" flat round dense @click="_openGroupFixEditor" />
      <q-btn
        v-if="isDefaultType"
        icon="share"
        flat
        round
        dense
        @click="showBottomSheet({ title: currentGroup.title, description: currentGroup.description })"
      />
      <div v-if="isDefaultType">
        <q-btn v-if="isExistsUser" flat round dense @click="_openLoginSubpage">
          <q-avatar size="24px">
            <img :src="profileImage" />
          </q-avatar>
        </q-btn>
        <q-btn v-else icon="account_circle" flat round dense @click="_openLoginSubpage" />
      </div>
      <q-btn v-if="isDefaultType" icon="menu" flat round dense @click="_openSettingMain" />
      <q-btn v-if="save" flat round dense icon="done" @click="save" />
    </q-toolbar>
  </q-header>
</template>

<style scope lang="scss">
.logo {
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &.original-name {
    letter-spacing: 1px;
    font-size: 24px;
  }

  &.group-name {
    font-size: 18px;
  }
}
</style>
