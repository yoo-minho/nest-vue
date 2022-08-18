<script setup lang="ts">
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';
import { useGroupStore } from '@/stores/group';
import { Link } from '@/types/common';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
const groupStore = useGroupStore();
const { fetchPosts } = groupStore;
const { posts, postLoading } = storeToRefs(groupStore);

watch(
  () => props.links,
  (links) => {
    if (links.length === 0) return;
    fetchPosts(links);
  },
  { immediate: true },
);
</script>

<template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section class="max-width">
      <div class="max-width">
        <div v-if="loading || postLoading">
          <q-item-label v-for="n in 6" :key="n">
            <q-item class="row q-col-gutter-sm" style="margin-top: -16px">
              <q-item-section class="col-9">
                <q-skeleton type="text" width="70%" height="28px" />
                <q-skeleton type="text" width="90%" height="20px" />
                <q-skeleton type="text" width="90%" height="20px" />
                <q-skeleton type="text" width="60%" height="20px" />
              </q-item-section>
              <q-item-section avatar class="col-3" style="padding: 0; align-items: center">
                <q-skeleton size="48px" />
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </q-item-label>
        </div>
        <div v-else>
          <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>
