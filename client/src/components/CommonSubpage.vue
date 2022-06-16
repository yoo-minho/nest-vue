<script setup lang="ts">
import GroupEditor from './GroupEditor.vue';
import LinkEditor from './LinkEditor.vue';
import SettingMain from './SettingMain.vue';

import { storeToRefs } from 'pinia';
import { useSubpageStore } from '../stores/subpage';

const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingMain } = storeToRefs(subpageStore);
</script>

<template>
  <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <LinkEditor v-if="isOpenLinkEditor" />
  </transition-group>

  <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <GroupEditor v-if="isOpenGroupEditor" />
  </transition-group>

  <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
    <SettingMain v-if="isOpenSettingMain" />
  </transition-group>
</template>

/* { path: '/stack', name: 'Stack', component: () => import('./views/StackMain.vue'), meta: { transition: 'slide-right'
}, }, { path: '/setting', name: 'Setting', component: () => import('./views/SettingMain.vue'), meta: { transition:
'slide-right' }, }, */

<style scoped>
.subpage {
  z-index: 3000;
}
</style>
