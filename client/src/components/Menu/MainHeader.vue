<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useSubpageStore } from '@/stores/subpage';
import { useUserStore } from '@/stores/user';
import { showBottomSheet } from '@/hooks/useSnsBottomSheeet';
import { MAINTAB_LABEL } from '@/constants';

const subpageStore = useSubpageStore();
const { openSettingMain } = subpageStore;
const userStore = useUserStore();
const { mainTab } = storeToRefs(userStore);

const router = useRouter();

const _openSettingMain = () => {
  router.push({ hash: '#Setting' });
  openSettingMain();
};
const titleByTab = computed(() => MAINTAB_LABEL.find((v) => v.type === mainTab.value)?.label);
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar>
      <q-toolbar-title class="name">{{ titleByTab }}</q-toolbar-title>
      <q-btn icon="search" flat round dense @click="() => router.push({ name: 'GroupSearch' })" />
      <q-btn icon="share" flat round dense @click="showBottomSheet()" />
      <q-btn icon="menu" flat round @click="_openSettingMain" />
    </q-toolbar>
  </q-header>
</template>

<style scope lang="scss">
.name {
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  margin-left: 4px;
  font-weight: bold;
}
</style>
