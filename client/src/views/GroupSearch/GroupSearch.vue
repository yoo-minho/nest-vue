<script setup lang="ts">
import SearchLayout from '@/layouts/SearchLayout.vue';
import SearchTagList from './components/SearchTagList.vue';
import SearchPostList from './components/SearchPostList.vue';

import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

const postStore = usePostStore();
const { searchWord, posts } = storeToRefs(postStore);

searchWord.value = '';
posts.value = [];
</script>

<template>
  <SearchLayout>
    <q-pull-to-refresh>
      <SearchTagList />
      <q-separator class="q-mb-sm" />
      <SearchPostList />
    </q-pull-to-refresh>
  </SearchLayout>
</template>

<style scoped></style>
