<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { Link } from '@/types/common';
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
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section class="max-width">
      <template v-if="loading || postLoading">
        <group-detail-post-loader />
      </template>
      <template v-else>
        <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
      </template>
    </q-item-section>
  </q-item>
</template>
