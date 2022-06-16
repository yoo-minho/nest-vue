<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useSubpageStore } from '../stores/subpage';

const subpageStore = useSubpageStore();
const { openGroupEditor, openSettingMain } = subpageStore;

const router = useRouter();
const route = useRoute();
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar v-if="route.name === 'Group'">
      <q-toolbar-title class="logo-font logo-style logo-common q-ml-sm" @click="router.push('/')">
        bundlog
      </q-toolbar-title>
      <q-btn flat round dense icon="search" />
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
      <q-btn flat round dense icon="menu" @click="openSettingMain" />
    </q-toolbar>

    <q-toolbar v-else-if="route.name === 'GroupDetail'">
      <q-toolbar-title class="logo-font logo-style logo-common q-ml-sm" @click="router.push('/')"
        >bundlog
      </q-toolbar-title>
      <q-btn flat round dense icon="search" />
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
      <q-btn flat round dense icon="menu" @click="openSettingMain" />
    </q-toolbar>

    <q-toolbar v-else>
      <q-toolbar-title class="logo-font logo-style logo-common q-ml-sm" @click="router.push('/')"
        >bundlog
      </q-toolbar-title>
      <q-btn flat round dense icon="search" />
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
      <q-btn flat round dense icon="menu" @click="openSettingMain" />
    </q-toolbar>
  </q-header>

  <!-- <q-toolbar v-else-if="route.fullPath === '/setting'">
      <q-btn flat round dense icon="arrow_back_ios" @click="router.push('/')" />
      <q-toolbar-title class="logo-common q-pl-none">더 보기</q-toolbar-title>
    </q-toolbar>

  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn flat round dense icon="close" @click="closeGroupEditor" />
      <q-toolbar-title>그룹 만들기</q-toolbar-title>
      <q-btn flat round dense icon="done" @click="saveGroup" />
    </q-toolbar>
  </q-header> -->
</template>

<style scoped>
.logo-font {
  font-family: Arial;
}
.logo-style {
  font-style: italic;
}
.logo-common {
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.logo-style:hover {
  font-style: normal;
}
</style>
