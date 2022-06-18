<script setup lang="ts">
import { Link } from '../types/common';
import { toRaw } from 'vue';
import { getBlogIconUrl } from '../constants';

const props = defineProps<{ linkData: Link; links?: boolean; posts?: boolean }>();
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
  <div>
    <q-avatar v-if="isTextImage(ogImageUrl)" color="primary" text-color="white" rounded>
      <div class="text-h6 non-selectable">{{ ogTitle.substring(0, 2) }}</div>
      <q-tooltip>{{ ogTitle }}<br />{{ url }}</q-tooltip>
    </q-avatar>
    <q-avatar v-else rounded size="48px" class="shadow-1">
      <img :src="ogImageUrl" :alt="ogTitle" style="object-fit: cover" />
      <q-tooltip>{{ ogTitle }}<br />{{ url }}</q-tooltip>
    </q-avatar>
    <q-avatar :class="{ 'blog-icon': true, 'shadow-2': true, posts, links }" rounded size="18px">
      <img :src="getBlogIconUrl(type)" :alt="ogTitle" />
      <q-tooltip>{{ type }}</q-tooltip>
    </q-avatar>
  </div>
</template>

<style scoped>
.blog-icon.links {
  position: relative;
  top: 20px;
  right: 12px;
}

.blog-icon.posts {
  position: relative;
  top: 24px;
  right: 8px;
}
</style>
