<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import TagList from '@/components/TagList.vue';

const groupStore = useGroupStore();
const { setCurrentTag } = groupStore;
const { currentTag, NavTags, tagsLoading } = storeToRefs(groupStore);
</script>

<template>
  <TagList
    :tags-loading="tagsLoading"
    :tags="NavTags"
    :current-tag="currentTag"
    prefix="#"
    @click-tag="setCurrentTag"
  ></TagList>
</template>
