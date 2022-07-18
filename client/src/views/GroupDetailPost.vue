<script setup lang="ts">
import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';
import { Post } from '../types/common';

const props = defineProps<{ posts: Post[] }>();
</script>

<template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <GroupDetailPostCard v-for="(post, i) in props.posts" :key="i" :post="post" />
    </q-item-section>
  </q-item>
</template>

<style></style>
