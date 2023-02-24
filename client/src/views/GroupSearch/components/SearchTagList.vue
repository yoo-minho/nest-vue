<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import TagList from '@/components/TagList.vue';

const postStore = usePostStore();
const { searchWord } = storeToRefs(postStore);
const { fetchSearchPosts } = postStore;
const searchKeywords = [{ name: '회고' }, { name: 'sql' }];

const clickTag = (tagName: string) => {
  searchWord.value = tagName;
  fetchSearchPosts();
};
</script>

<template>
  <TagList :tags-loading="false" :tags="searchKeywords" @click-tag="clickTag"></TagList>
</template>
