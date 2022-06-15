<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from './stores/group';

import GroupEditor from './components/GroupEditor.vue';
import LinkEditor from './components/LinkEditor.vue';
import CommonHeader from './components/CommonHeader.vue';

const groupStore = useGroupStore();
const { isOpenGroupEditor, isOpenLinkEditor } = storeToRefs(groupStore);
</script>

<template>
  <div class="max-width">
    <transition-group appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
      <LinkEditor v-if="isOpenLinkEditor" />
    </transition-group>
    <transition-group appear enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <GroupEditor v-if="isOpenGroupEditor" />
    </transition-group>

    <q-layout>
      <CommonHeader />
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </q-layout>
  </div>
</template>

<style>
body {
  overflow: hidden;
}

#app {
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

ul {
  padding: 5px;
  list-style-type: none;
}

.max-width {
  max-width: 460px;
  min-width: 375px;
  margin: 0 auto;
}

.container-without-header-n-footer {
  height: calc(100vh - 51px);
}
</style>
