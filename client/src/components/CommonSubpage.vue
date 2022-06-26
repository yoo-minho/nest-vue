<script setup lang="ts">
import GroupEditor from './GroupEditor.vue';
import LinkEditor from './LinkEditor.vue';
import SettingMain from './SettingMain.vue';
import StackMain from './StackMain.vue';

import { storeToRefs } from 'pinia';
import { useSubpageStore } from '../stores/subpage';
import stackArray from '../data/stack.json';
import platformArray from '../data/platform.json';
import { computed } from 'vue';

const subpageStore = useSubpageStore();
const { stack, isOpenGroupEditor, isOpenLinkEditor, isOpenSettingMain, isOpenStackMain } = storeToRefs(subpageStore);

const array = computed(() => (stack.value === 'stack' ? stackArray : platformArray));
const title = computed(() => (stack.value === 'stack' ? '기술 스택' : '허용가능한 플랫폼'));
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
    <StackMain v-if="isOpenStackMain" :stack-array="array" :title="title" />
  </transition-group>
</template>

<style>
.subpage {
  position: absolute;
  z-index: 3000;
  background-color: white;
}
</style>
