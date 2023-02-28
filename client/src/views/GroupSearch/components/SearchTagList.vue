<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import TagList from '@/components/TagList.vue';

const postStore = usePostStore();
const { searchWord } = storeToRefs(postStore);
const { fetchSearchPosts } = postStore;
const searchKeywords = [
  { label: '회고', value: '회고|.log' },
  { label: '테스트', value: '테스트|test' },
  { label: '인프콘', value: '인프콘' },
  { label: 'sql', value: 'sql|쿼리|query' },
  { label: '프론트', value: '프론트' },
  { label: '백엔드', value: '백엔드' },
  { label: '성장', value: '성장' },
  { label: '이직', value: '이직' },
];

const clickTag = (tagName: string) => {
  searchWord.value = tagName;
  fetchSearchPosts();
};
</script>

<template>
  <TagList :tags-loading="false" :tags="searchKeywords" @click-tag="clickTag">
    <q-item-label>추천 키워드로 검색해보세요</q-item-label>
  </TagList>
</template>
