<script setup lang="ts">
import { toRefs } from 'vue';
import { getStacksImageUrl } from '../constants';

interface StackJson {
  name: string;
  version: string;
  description: string;
  path: string;
  url: string;
  github_star: string;
}
const props = defineProps<{ stackJson: StackJson }>();
const { name, version, description, path, url, github_star } = toRefs(props.stackJson);
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
      <q-item-label caption>{{ description }}</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-badge>{{ github_star }}</q-badge>
    </q-item-section>
  </q-item>
</template>

<style></style>
