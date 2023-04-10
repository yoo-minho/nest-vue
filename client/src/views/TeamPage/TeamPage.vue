<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import TeamTagList from './components/TeamTagList.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import TeamList from './components/TeamList.vue';

const groupStore = useGroupStore();
const { fetchGroups } = groupStore;
const { groupsLoading } = storeToRefs(groupStore);

const page = ref(1);

const refresh = async (done: () => void) => {
  groupsLoading.value = true;
  page.value = 1;
  await fetchGroups();
  page.value++;
  done();
};
</script>

<template>
  <MainLayout @pull2refresh="refresh">
    <TeamTagList />
    <TeamList />
  </MainLayout>
</template>
