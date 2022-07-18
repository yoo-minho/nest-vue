<script setup lang="ts">
import GroupDetailLinkCard from '../components/GroupDetailLinkCard.vue';
import { Link } from '../types/common';

const props = defineProps<{ links: Link[] }>();
</script>

<template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <GroupDetailLinkCard v-for="(link, i) in props.links" :key="i" :link="link" />
    </q-item-section>
  </q-item>
</template>

<style></style>
