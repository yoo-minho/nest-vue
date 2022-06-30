<script setup lang="ts">
import { toRaw } from 'vue';
import { getImageByBlogType } from '../constants';
import { useGroupStore } from '../stores/group';
import { Link } from '../types/common';

const props = defineProps<{ link: Link }>();
const { index, type, url, ogTitle, ogDescription, ogImageUrl = getImageByBlogType(type) } = toRaw(props.link);

const { deleteLink } = useGroupStore();
</script>

<template>
  <q-item clickable>
    <q-item-section side>
      <q-avatar rounded size="48px">
        <q-img :src="ogImageUrl" class="image-48">
          <template #error>{{ ogTitle.substring(0, 1) }}</template>
        </q-img>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ ogTitle }}</q-item-label>
      <q-item-label class="ellipsis" caption>{{ ogDescription }}</q-item-label>
      <q-item-label caption>{{ url }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon name="clear" @click="deleteLink(index)" />
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
