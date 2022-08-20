<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { Link } from '@/types/common';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import GroupDetailPostCard from './components/GroupDetailPostCard.vue';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
const groupStore = useGroupStore();
const { fetchPosts } = groupStore;
const { posts, postLoading } = storeToRefs(groupStore);

watch(
  () => props.links,
  (links) => {
    fetchPosts(links);
  },
  { immediate: true },
);
</script>

<template>
  <ContentsLayout>
    <template v-if="loading || postLoading">
      <GroupDetailPostLoader />
    </template>
    <template v-else>
      <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
    </template>
  </ContentsLayout>
</template>
