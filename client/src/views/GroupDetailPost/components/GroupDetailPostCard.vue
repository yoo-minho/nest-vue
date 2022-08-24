<script setup lang="ts">
import { toRaw } from 'vue';
import { Post } from '@/types/common';
import { openUrl } from '@/util';
import { getDateString } from '@/plugin/dayjs';
import LinkInfo from '@/components/Info/LinkInfo.vue';

const props = defineProps<{ post: Post }>();
const { post } = toRaw(props);
</script>

<template>
  <q-item-label class="cursor-pointer" @click="openUrl(post.url)">
    <q-item class="row q-col-gutter-sm">
      <q-item-section class="col-9">
        <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{ post.title }}</q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ post.description || 'ㅤ' }}</q-item-label>
        <q-item-label class="text-grey-5">{{ getDateString(post.createdAt) }}</q-item-label>
      </q-item-section>
      <q-item-section class="col-3 items-center">
        <LinkInfo :link-data="post.link" :posts="true" />
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-item-label>
</template>
