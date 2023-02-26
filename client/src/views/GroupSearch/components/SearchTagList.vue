<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import TagList from '@/components/TagList.vue';

const postStore = usePostStore();
const { searchWord } = storeToRefs(postStore);
const { fetchSearchPosts } = postStore;
const searchKeywords = [
  { label: '성장', value: '성장' },
  { label: '이직', value: '이직' },
  { label: '회고', value: '회고|.log' },
  { label: '책', value: '책|독서' },
  { label: 'sql', value: 'sql|쿼리|query' },
  { label: '최적화', value: '최적화' },
  { label: '프론트', value: '프론트' },
  { label: '백엔드', value: '백엔드' },
];

const clickTag = (tagName: string) => {
  searchWord.value = tagName;
  fetchSearchPosts();
};
</script>

<template>
  <TagList :tags-loading="false" :tags="searchKeywords" @click-tag="clickTag"></TagList>
</template>
