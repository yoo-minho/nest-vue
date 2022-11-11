<script setup lang="ts">
import GroupEditor from '@/components/Editor/GroupEditor.vue';
import LinkEditor from '@/components/Editor/LinkEditor.vue';
import SettingSubpage from '@/components/Setting/SettingSubpage.vue';
import DataSubpage from '@/components/Setting/DataSubpage.vue';

import { storeToRefs } from 'pinia';
import { useSubpageStore } from '@/stores/subpage';

const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingSubpage, isOpenDataSubpage } = storeToRefs(subpageStore);
</script>

<template>
  <transition-group name="subpage">
    <GroupEditor v-if="isOpenGroupEditor" />
    <LinkEditor v-if="isOpenLinkEditor" />
    <SettingSubpage v-if="isOpenSettingSubpage" />
    <DataSubpage v-if="isOpenDataSubpage" />
  </transition-group>
</template>

<style lang="scss">
.subpage {
  position: absolute;
  z-index: 3000;
  background-color: white;
}
</style>
