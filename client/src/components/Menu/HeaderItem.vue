<script setup lang="ts">
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';

const subpageStore = useSubpageStore();
const { openGroupEditor, openSettingMain } = subpageStore;

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
const reload = () => {
  router.replace({ name: 'Group' });
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

      <q-btn v-if="refresh" icon="sync" flat round dense @click="openGroupEditor" />
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
