<script setup lang="ts">
import { ref, toRaw } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import { usePostStore } from '@/stores/post';
import { useGroupStore } from '@/stores/group';
import { storeToRefs } from 'pinia';
import { useQuasar } from 'quasar';
import { showBottomSheet } from '@/hooks/useSnsBottomSheeet';

const postStore = usePostStore();

const { scrapLoading } = storeToRefs(postStore);
const { initPostData, scrapPosts } = postStore;

const subpageStore = useSubpageStore();
const { openSettingMain, openGroupEditor, openLoginSubpage } = subpageStore;

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const { initGroupData, initLinks } = groupStore;

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
}

const props = defineProps<HeaderOption>();
const { type } = toRaw(props);
const isDefaultType = type === 'DEFAULT';
const rotate = ref(false);
const $q = useQuasar();

const reload = () => {
  if (route.name === 'Group') {
    router.go(0);
    return;
  }
  router.replace({ name: 'Group' });
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
const scrapPostsAndAction = async () => {
  const { id: groupId, links } = currentGroup.value;
  if (!links) return;

  if (scrapLoading.value) {
    $q.notify({ type: 'nagative', message: 'Wait for a moment!' });
    return;
  }

  rotate.value = true;

  initPostData();
  await scrapPosts(links, false, groupId);

  $q.notify({ type: 'positive', message: 'Refresh Completed!' });
  setTimeout(() => (rotate.value = false), 400);
};
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn v-if="close" flat round dense icon="close" @click="close" />
      <q-btn v-if="back" flat round dense icon="keyboard_backspace" @click="back" />
      <q-toolbar-title v-if="isDefaultType" class="logo-font logo-style logo-common q-ml-sm" @click="reload">
        Teamlog
      </q-toolbar-title>
      <q-toolbar-title v-if="title">{{ title }}</q-toolbar-title>
      <q-btn
        v-if="refresh"
        :class="{ loading_arrow: rotate }"
        icon="refresh"
        flat
        round
        dense
        @click="scrapPostsAndAction"
      />
      <q-btn v-if="editor" icon="add_circle_outline" flat round dense @click="_openGroupEditor" />
      <q-btn v-if="fix" icon="mode_edit_outline" flat round dense @click="_openGroupFixEditor" />
      <q-btn v-if="isDefaultType" icon="share" flat round dense @click="showBottomSheet($q)" />
      <q-btn v-if="isDefaultType" icon="login" flat round dense @click="_openLoginSubpage" />
      <q-btn v-if="isDefaultType" icon="more_vert" flat round dense @click="_openSettingMain" />
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
.loading_arrow {
  -webkit-animation: rotation 0.5s infinite linear;
  -moz-animation: rotation 0.5s infinite linear;
  -o-animation: rotation 0.5s infinite linear;
  animation: rotation 0.5s infinite linear;
}
@-webkit-keyframes rotation {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(359deg);
  }
}
@-moz-keyframes rotation {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(359deg);
  }
}
@-o-keyframes rotation {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(359deg);
  }
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
