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

const groupMain = String(route.name) === 'Group';
const groupDetail = String(route.name).includes('GroupDetail');
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
    <HeaderItem :logo="true" :editor="groupMain" :share="true" :refresh="groupDetail" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <slot></slot>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style>
.subpage-leave-to {
  position: absolute;
  transform: translateY(100vh);
}

.subpage-leave-active {
  transition: ease-out 0.5s;
}

.subpage-leave-from {
  position: absolute;
  transform: translateY(0);
}

.subpage-enter-to {
  position: absolute;
  transform: translateY(0);
}

.subpage-enter-active {
  transition: ease-out 0.5s;
}

.subpage-enter-from {
  position: absolute;
  transform: translateY(100vh);
}
</style>
