<script setup lang="ts">
import { Group } from '../types/common';
import { toRaw } from 'vue';
import { getBlogIconUrl } from '../constants';

const props = defineProps<{ groupData: Group; detail: boolean }>();
const { title, description, links } = toRaw(props.groupData);

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
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item v-if="!detail" style="padding: 0; min-height: 0">
            <q-item-section class="text-weight-bolder">{{ title }}</q-item-section>
            <q-item-section side>조회수 999</q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption>
          <span :class="{ [detail ? 'ellipsis-5-lines' : 'ellipsis-2-lines']: true }">{{ description }}</span>
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item class="q-gutter-x-sm">
      <div v-for="(link, i) in links" :key="i">
        <q-avatar v-if="isTextImage(link.ogImageUrl)" color="primary" text-color="white" rounded>
          <div class="text-h6 non-selectable">{{ link.ogTitle.substring(0, 2) }}</div>
          <q-tooltip>{{ link.ogTitle }}<br />{{ link.url }}</q-tooltip>
        </q-avatar>
        <q-avatar v-else rounded size="48px">
          <img :src="link.ogImageUrl" :alt="link.ogTitle" />
          <q-tooltip>{{ link.ogTitle }}<br />{{ link.url }}</q-tooltip>
        </q-avatar>
        <q-avatar :class="{ 'blog-icon': true, 'shadow-2': true }" rounded size="18px">
          <img :src="getBlogIconUrl(link.type)" :alt="link.ogTitle" />
          <q-tooltip>{{ link.type }}</q-tooltip>
        </q-avatar>
      </div>
    </q-item>
  </div>
</template>

<style scoped>
.blog-icon {
  top: 20px;
  right: 12px;
}
</style>
