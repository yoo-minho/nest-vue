<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import TagList from '@/components/TagList.vue';
import { useRoute, useRouter } from 'vue-router';

const postStore = usePostStore();
const { searchWord, searchKeyword } = storeToRefs(postStore);
const { fetchSearchPosts } = postStore;
const route = useRoute();
const router = useRouter();
const searchKeywords = [
  { label: '회고', value: '회고|결산|.log|정산' },
  { label: '인프콘', value: '인프콘' },
  { label: '글또', value: '글또' },
  { label: '이직', value: '이직' },
  { label: '테스트', value: '테스트|test' },
  { label: 'sql', value: 'sql|쿼리|query' },
];

const getSearchValueByTag = (label: string) => searchKeywords.filter((w) => w.label === label)[0]?.value;
searchKeyword.value = String(route.query['keyword'] || '');
searchWord.value = getSearchValueByTag(searchKeyword.value);

const clickTag = (tagName: string) => {
  router.replace({ query: { keyword: tagName } });
  searchKeyword.value = tagName;
  searchWord.value = getSearchValueByTag(tagName);
  fetchSearchPosts();
};
</script>

<template>
  <TagList :tags-loading="false" :tags="searchKeywords" size="md" :current-tag="searchKeyword" @click-tag="clickTag">
    <template #header>
      <q-item-label>추천 키워드로 검색해보세요</q-item-label>
    </template>
  </TagList>
</template>
