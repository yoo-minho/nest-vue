<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSubpageStore } from '@/stores/subpage';

import HeaderItem from '@/components/Menu/HeaderItem.vue';
import GroupEditor from '@/components/Editor/GroupEditor.vue';
import LinkEditor from '@/components/Editor/LinkEditor.vue';
import SettingSubpage from '@/components/Setting/SettingSubpage.vue';
import DataSubpage from '@/components/Setting/DataSubpage.vue';

const route = useRoute();

const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingSubpage, isOpenDataSubpage } = storeToRefs(subpageStore);

const editor = String(route.name) === 'Group';
const refresh = String(route.name).includes('GroupDetail');
</script>

<template>
  <q-layout>
    <Teleport to="#subpage">
      <transition-group name="subpage">
        <GroupEditor v-if="isOpenGroupEditor" />
        <LinkEditor v-if="isOpenLinkEditor" />
        <SettingSubpage v-if="isOpenSettingSubpage" />
        <DataSubpage v-if="isOpenDataSubpage" />
      </transition-group>
    </Teleport>
    <HeaderItem :logo="true" :editor="editor" :refresh="refresh" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <slot></slot>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.subpage-enter-from,
.subpage-leave-to {
  transform: translateY(100vh);
}

.subpage-enter-active,
.subpage-leave-active {
  transition: all 0.5s;
}

.subpage-enter-to,
.subpage-leave-from {
  transform: translateY(0);
}
</style>
