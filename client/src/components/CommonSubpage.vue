<script setup lang="ts">
import GroupEditor from './GroupEditor.vue';
import LinkEditor from './LinkEditor.vue';
import SettingMain from './SettingMain.vue';
import StackMain from './StackMain.vue';

import { storeToRefs } from 'pinia';
import { useSubpageStore } from '../stores/subpage';

const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingMain, isOpenStackMain } = storeToRefs(subpageStore);
</script>

<template>
  <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <GroupEditor v-if="isOpenGroupEditor" />
  </transition-group>

  <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <LinkEditor v-if="isOpenLinkEditor" />
  </transition-group>

  <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <SettingMain v-if="isOpenSettingMain" />
  </transition-group>

  <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <StackMain v-if="isOpenStackMain" />
  </transition-group>
</template>

<style>
.subpage {
  position: absolute;
  z-index: 3000;
  background-color: white;
}
</style>
