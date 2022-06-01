<script setup lang="ts">
import { Link } from '../types/common';
import { toRaw } from 'vue';
import { getBlogIconUrl } from '../constants';

const props = defineProps<{ linkData: Link }>();
const { ogImageUrl, ogTitle, url, type } = toRaw(props.linkData);

function isTextImage(url: string) {
  if (url === 'https://t1.daumcdn.net/tistory_admin/static/images/openGraph/opengraph.png') {
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <q-avatar v-if="isTextImage(ogImageUrl)" color="primary" text-color="white" rounded>
    <div class="text-h6 non-selectable">{{ ogTitle.substring(0, 2) }}</div>
    <q-tooltip>{{ ogTitle }}<br />{{ url }}</q-tooltip>
  </q-avatar>
  <q-avatar v-else rounded size="48px">
    <img :src="ogImageUrl" :alt="ogTitle" />
    <q-tooltip>{{ ogTitle }}<br />{{ url }}</q-tooltip>
  </q-avatar>
  <q-avatar :class="{ 'blog-icon': true, 'shadow-2': true }" rounded size="18px">
    <img :src="getBlogIconUrl(type)" :alt="ogTitle" />
    <q-tooltip>{{ type }}</q-tooltip>
  </q-avatar>
</template>

<style scoped>
.blog-icon {
  top: 20px;
  right: 12px;
}
</style>
