<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupMainEmpty from '@/components/Empty/GroupMainEmpty.vue';
import GroupCard from './components/GroupCard.vue';
import GroupTagList from './components/GroupTagList.vue';
import { delay } from '@/util/CommUtil';

const groupStore = useGroupStore();
const { fetchAllGroup, fetchByTag, fetchAllTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag } = storeToRefs(groupStore);

onMounted(() => {
  fetchAllTag();
});

const tagValue = ref('');

const fetchData = async (tag: string) => {
  if (isTotalTag.value) {
    await fetchAllGroup();
  } else {
    tagValue.value = tag;
    await fetchByTag(tag);
  }
};

watch(
  () => currentTag.value,
  (tag) => {
    groupsLoading.value = true;
    fetchData(tag);
  },
  { immediate: true },
);

const refresh = async (done: () => void) => {
  await delay(1000);
  await fetchData(tagValue.value);
  done();
};
</script>

<template>
  <DefaultLayout>
    <q-pull-to-refresh @refresh="refresh">
      <GroupTagList />
      <q-separator class="q-mb-sm" />
      <q-page class="q-pt-sm q-pb-md q-px-md">
        <template v-if="groupsLoading">
          <GroupMainLoader />
        </template>
        <template v-if="groups.length === 0">
          <GroupMainEmpty />
        </template>
        <template v-else>
          <GroupCard v-for="group in groups" :key="group.id" :group="group" />
        </template>
      </q-page>
    </q-pull-to-refresh>
  </DefaultLayout>
</template>

<style lang="scss">
@import './styles/_group-main.scss';
</style>
