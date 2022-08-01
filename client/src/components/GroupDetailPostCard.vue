<script setup lang="ts">
import { Post } from '../types/common';
import { toRaw } from 'vue';
import LinkCard from './LinkCard.vue';
import { openUrl } from '../util';

const props = defineProps<{ post: Post }>();
const { post } = toRaw(props);
</script>

<template>
  <q-item-label @click="openUrl(post.url)">
    <q-item class="row q-col-gutter-sm">
      <q-item-section class="col-9">
        <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{ post.title }}</q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ post.description || 'ㅤ' }}</q-item-label>
        <q-item-label class="text-grey-5">{{ post.createdAt }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-3" style="align-items: center">
        <LinkCard :link-data="post.link" :posts="true"></LinkCard>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-item-label>
</template>

<style scoped></style>
