<script setup lang="ts">
import { toRaw } from 'vue';
import { Link } from '@/types/common';
import { getImageByBlogType, isTextImage } from '@/util/ImageUtil';

const props = defineProps<{ linkData: Link; links?: boolean; posts?: boolean }>();
const { imagePath = '', title, url, type } = toRaw(props.linkData);
</script>

<template>
  <div>
    <q-avatar v-if="isTextImage(imagePath)" color="primary" text-color="white" rounded>
      <div class="text-h6 non-selectable">{{ title.substring(0, 2) }}</div>
      <q-tooltip>{{ title }}<br />{{ url }}</q-tooltip>
    </q-avatar>
    <q-avatar v-else rounded size="48px" class="shadow-1">
      <q-img :src="imagePath" :alt="title" class="image-48">
        <template #error>{{ title.substring(0, 1) }}</template>
      </q-img>
      <q-tooltip>{{ title }}<br />{{ url }}</q-tooltip>
    </q-avatar>
    <q-avatar :class="{ 'blog-icon': true, 'shadow-2': true, posts, links }" rounded size="18px">
      <img :src="getImageByBlogType(type)" :alt="title" />
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
