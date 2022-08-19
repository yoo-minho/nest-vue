<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import GroupCard from './components/GroupCard.vue';

const groupStore = useGroupStore();
const { fetchAllGroup, fetchByTag, fetchAllTag, setCurrentTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag, NavTags, tagsLoading } = storeToRefs(groupStore);

onMounted(() => {
  fetchAllTag();
});

watch(
  () => currentTag.value,
  (tag) => {
    groupsLoading.value = true;
    if (isTotalTag.value) {
      fetchAllGroup();
    } else {
      fetchByTag(tag);
    }
  },
  { immediate: true },
);
</script>

<template>
  <q-layout>
    <HeaderItem :logo="true" :editor="true" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
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
            <q-skeleton v-for="n in 1" :key="n" :type="'QChip'" class="q-ma-xs" />
          </template>
          <template v-else>
            <group-card v-for="group in groups" :key="group.id" :group="group" />
          </template>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style scope>
.tag-area {
  height: 50px;
  max-width: 900px;
}
.active {
  color: white;
  background-color: black;
  font-weight: bolder;
}
</style>
