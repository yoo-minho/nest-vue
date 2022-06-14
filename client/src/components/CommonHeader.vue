<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useGroupStore } from '../stores/group';

const groupStore = useGroupStore();
const { openGroupEditor } = groupStore;

const router = useRouter();
const route = useRoute();
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar v-if="route.fullPath === '/stack'">
      <q-btn flat round dense icon="arrow_back_ios" @click="router.push('/setting')" />
      <q-toolbar-title class="logo-common q-pl-none">기술 스택</q-toolbar-title>
    </q-toolbar>

    <q-toolbar v-else-if="route.fullPath === '/setting'">
      <q-btn flat round dense icon="arrow_back_ios" @click="router.push('/')" />
      <q-toolbar-title class="logo-common q-pl-none">더 보기</q-toolbar-title>
    </q-toolbar>

    <q-toolbar v-else>
      <q-toolbar-title class="logo-font logo-style logo-common q-ml-sm" @click="router.push('/')"
        >bundlog
      </q-toolbar-title>
      <q-btn flat round dense icon="search" />
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
      <q-btn flat round dense icon="menu" @click="router.push('/setting')" />
    </q-toolbar>
  </q-header>
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
