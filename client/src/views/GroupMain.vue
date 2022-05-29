<script setup lang="ts">
import { storeToRefs } from 'pinia';
import GroupCard from '../components/GroupCard.vue';
import { useGroupStore } from '../stores/group';

const groupStore = useGroupStore();
const { openGroupEditor, init } = groupStore;
const { groupDataList } = storeToRefs(groupStore);

init();
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar>
      <q-btn flat round dense icon="search" />
      <q-toolbar-title>그룹</q-toolbar-title>
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
    </q-toolbar>
  </q-header>

  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <p v-for="groupData in groupDataList" :key="(groupData.index as number)">
          <GroupCard :group-data="groupData" />
        </p>
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
