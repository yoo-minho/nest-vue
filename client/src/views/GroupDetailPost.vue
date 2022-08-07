<script setup lang="ts">
import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';

import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';

import { onMounted, ref } from 'vue';
import { Link } from '../types/common';
import { delay } from '../util';

const props = defineProps<{ links: { link: Link }[] }>();
const loading = ref(true);

const groupStore = useGroupStore();
const { loadPosts } = groupStore;
const { posts } = storeToRefs(groupStore);

onMounted(async () => {
  await loadPosts(props.links);
  await delay(1000);
  loading.value = false;
});
</script>

<template>
  <div v-if="loading">
    <q-skeleton type="text" width="15%" height="20px" />
  </div>
  <q-item v-else class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
    </q-item-section>
  </q-item>
</template>

<style></style>
