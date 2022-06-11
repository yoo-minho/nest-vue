<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useGroupStore } from './stores/group';

import GroupEditor from './components/GroupEditor.vue';
import LinkEditor from './components/LinkEditor.vue';
import { TabName } from './types/common';

const router = useRouter();

const groupStore = useGroupStore();
const { openGroupEditor } = groupStore;
const { isOpenGroupEditor, isOpenLinkEditor } = storeToRefs(groupStore);
const HOME_TAB = 'group';
const CURRENT_TAB = location.pathname.replace('/', '') || HOME_TAB;
const tab = ref(CURRENT_TAB);

function clickTab(tabName: TabName): void {
  tab.value = tabName;
  router.push({ path: `/${tabName === HOME_TAB ? '' : tabName}` });
}
</script>

<template>
  <div class="max-width">
    <transition-group appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
      <LinkEditor v-if="isOpenLinkEditor" />
    </transition-group>
    <transition-group appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <GroupEditor v-if="isOpenGroupEditor" />
    </transition-group>

    <q-layout>
      <q-header bordered class="bg-primary text-white max-width">
        <q-toolbar>
          <q-toolbar-title class="logo-title" @click="router.push('/')">logbunch</q-toolbar-title>
          <q-btn flat round dense icon="search" />
          <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
        </q-toolbar>
      </q-header>

      <router-view />

      <q-footer bordered class="bg-white text-primary max-width">
        <q-tabs v-model="tab" no-caps active-color="primary" indicator-color="transparent" class="text-grey">
          <q-tab name="group" label="그룹" @click.prevent="clickTab('group')" />
          <q-tab name="stack" label="스택" @click.prevent="clickTab('stack')" />
        </q-tabs>
      </q-footer>
    </q-layout>
  </div>
</template>

<style>
body {
  overflow: hidden;
}

#app {
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.max-width {
  max-width: 460px;
  min-width: 375px;
  margin: 0 auto;
}

.container-without-header-n-footer {
  height: calc(100vh - 100px);
}

.logo-title {
  font-family: Arial;
  font-style: italic;
  color: white;
  margin-left: 8px;
  font-weight: bold;
  cursor: pointer;
}
.logo-title:hover {
  font-style: normal;
}
</style>
