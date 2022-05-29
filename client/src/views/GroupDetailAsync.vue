<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const groupStore = useGroupStore();
const { selectGroup } = groupStore;
const { currentGroupData } = storeToRefs(groupStore);

const props = defineProps<{ id: number }>();
await selectGroup(props.id);
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar>
      <q-btn flat round dense icon="arrow_back" @click="router.back" />
      <q-toolbar-title>{{ currentGroupData.title }}</q-toolbar-title>
    </q-toolbar>
  </q-header>

  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <GroupCard :group-data="currentGroupData" :detail="true" />
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
