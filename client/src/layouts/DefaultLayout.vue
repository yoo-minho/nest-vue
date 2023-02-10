<script setup lang="ts">
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSubpageStore } from '@/stores/subpage';

import HeaderItem from '@/components/Menu/HeaderItem.vue';
import GroupEditor from '@/components/Editor/GroupEditor.vue';
import LinkEditor from '@/components/Editor/LinkEditor.vue';
import SettingSubpage from '@/components/Setting/SettingSubpage.vue';
import DataSubpage from '@/components/Setting/DataSubpage.vue';
import LoginSubpage from '@/components/Auth/LoginSubpage.vue';
import { ref, watch } from 'vue';

const route = useRoute();

const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingSubpage, isOpenDataSubpage, isOpenLoginSubpage } =
  storeToRefs(subpageStore);

const groupMain = String(route.name) === 'Group';
const groupDetail = String(route.name).includes('GroupDetail');
const isStatView = (routeName: string) => routeName === 'GroupDetailStat';
const groupDetailStat = ref(isStatView(String(route.name)));

watch(
  () => route.name,
  () => {
    groupDetailStat.value = isStatView(String(route.name));
  },
);
</script>

<template>
  <q-layout>
    <Teleport to="#subpage">
      <transition-group name="subpage">
        <GroupEditor v-if="isOpenGroupEditor" />
        <LinkEditor v-if="isOpenLinkEditor" />
        <SettingSubpage v-if="isOpenSettingSubpage" />
        <DataSubpage v-if="isOpenDataSubpage" />
        <LoginSubpage v-if="isOpenLoginSubpage" />
      </transition-group>
    </Teleport>
    <HeaderItem type="DEFAULT" :editor="groupMain" :refresh="groupDetail" :fix="groupDetail" />
    <q-page-container>
      <q-scroll-area class="max-width without-header" :visible="false" :thumb-style="{ zIndex: '999999' }">
        <q-layout style="min-height: 0">
          <q-page-container style="min-height: 0">
            <q-page>
              <slot></slot>
            </q-page>
          </q-page-container>
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" :color="groupDetailStat ? 'green-4' : 'dark'" />
          </q-page-scroller>
        </q-layout>
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
