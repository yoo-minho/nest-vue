<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { watch } from 'vue';
import GroupDetailPostCard from './GroupDetailPostCard.vue';
import GroupDetailPostEmpty from '@/components/Empty/GroupDetailPostEmpty.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';

const postStore = usePostStore();
const { fetchPosts } = postStore;
const { posts, postLoading } = storeToRefs(postStore);

const props = defineProps<{ links: LinkWrap[] }>();

watch(
  () => props.links,
  (links) => {
    if (links.length === 0) return;
    postLoading.value = true;
    fetchPosts(links);
  },
  { immediate: true },
);
</script>

<template>
  <template v-if="postLoading">
    <GroupDetailPostLoader />
  </template>
  <template v-else-if="posts.length === 0">
    <GroupDetailPostEmpty />
  </template>
  <template v-else>
    <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
  </template>
</template>
