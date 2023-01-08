<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupCard from './components/GroupCard.vue';
import GroupTagList from './components/GroupTagList.vue';

const groupStore = useGroupStore();
const { fetchAllGroup, fetchByTag, fetchAllTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag } = storeToRefs(groupStore);

onMounted(() => {
  fetchAllTag();
});

watch(
  () => currentTag.value,
  async (tag) => {
    groupsLoading.value = groups.value.length > 0 ? false : true;
    if (isTotalTag.value) {
      await fetchAllGroup();
    } else {
      await fetchByTag(tag);
    }
  },
  { immediate: true },
);
</script>

<template>
  <DefaultLayout>
    <GroupTagList />
    <q-page class="q-pa-md">
      <template v-if="groupsLoading">
        <GroupMainLoader />
      </template>
      <template v-else>
        <GroupCard v-for="group in groups" :key="group.id" :group="group" />
      </template>
    </q-page>
  </DefaultLayout>
</template>

<style lang="scss">
@import './styles/_group-main.scss';
</style>
