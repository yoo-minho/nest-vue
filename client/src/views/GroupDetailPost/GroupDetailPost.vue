<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

import { LinkWrap } from '@/types/common';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailPostEmpty from '@/components/Empty/GroupDetailPostEmpty.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import GroupDetailPostCard from './components/GroupDetailPostCard.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
const postStore = usePostStore();
const { fetchPosts } = postStore;
const { posts, postLoading, scrapLoading } = storeToRefs(postStore);

watch(
  () => [props.links, scrapLoading],
  (curr, prev) => {
    console.log('watch', { curr, prev });
    if (scrapLoading) return;
    if (props.links.length === 0) return;
    fetchPosts(props.links);
  },
  { immediate: true },
);
</script>

<template>
  <ContentsLayout>
    <template v-if="loading || postLoading">
      <GroupDetailPostLoader />
    </template>
    <template v-else-if="posts.length === 0">
      <GroupDetailPostEmpty />
    </template>
    <template v-else>
      <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
    </template>
  </ContentsLayout>
</template>
