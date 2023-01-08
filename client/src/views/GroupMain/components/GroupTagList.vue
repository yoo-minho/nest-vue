<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';

const groupStore = useGroupStore();
const { setCurrentTag } = groupStore;
const { currentTag, NavTags, tagsLoading } = storeToRefs(groupStore);
</script>

<template>
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
          >#{{ tag.name }}
        </q-chip>
      </template>
    </div>
  </q-scroll-area>
</template>

<style lang="scss" scoped></style>
