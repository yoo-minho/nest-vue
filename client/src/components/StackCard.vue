<script setup lang="ts">
import { toRaw } from 'vue';
import { getStacksImageUrl } from '../constants';

const props = defineProps<{
  name: string;
  version: string;
  description: string;
  path: string;
  url: string;
  githubStar: string;
}>();
const { name, version, description, path, url, githubStar } = toRaw(props);
const openUrl = (url: string) => window.open(url, 'stack');
</script>

<template>
  <q-item>
    <q-item-section top avatar style="cursor: pointer" @click="openUrl(url)">
      <q-avatar rounded size="80px">
        <img :src="getStacksImageUrl(path)" style="object-fit: cover" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ name }} {{ version }}</q-item-label>
      <q-item-label caption class="ellipsis-3-lines">{{ description }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="githubStar" side top>
      <q-badge>{{ githubStar }}</q-badge>
    </q-item-section>
  </q-item>
</template>

<style></style>
