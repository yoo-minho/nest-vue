<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';

import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupCard from './components/GroupCard.vue';

const groupStore = useGroupStore();
const { fetchAllGroup, fetchByTag, fetchAllTag, setCurrentTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag, NavTags, tagsLoading } = storeToRefs(groupStore);

onMounted(() => {
  fetchAllTag();
});

watch(
  () => currentTag.value,
  async (tag) => {
    groupsLoading.value = true;
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
    <q-scroll-area class="q-px-md q-pt-md tag-area" :thumb-style="{ opacity: '0' }">
      <div class="row no-wrap">
        <template v-if="tagsLoading">
          <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
        </template>
        <template v-else>
          <q-chip
            v-for="(tag, i) in NavTags"
            :key="i"
            :class="{ active: currentTag === tag.name }"
            clickable
            @click="setCurrentTag(tag.name)"
            >{{ tag.name }}
          </q-chip>
        </template>
      </div>
    </q-scroll-area>
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
