<script setup lang="ts">
import { toRefs } from 'vue';
import { Link } from '@/types/common';
import GroupDetailStatBanner from './components/GroupDetailStatBanner.vue';
import GroupDetailStatLast from './components/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi.vue';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
const { links } = toRefs(props);
</script>

<template>
  <div class="max-width">
    <div class="q-pa-md">
      <group-detail-stat-banner />
      <q-separator class="q-my-md" />
      <group-detail-stat-jandi :links="links" :loading="loading" />
      <q-separator class="q-mt-md" />
      <group-detail-stat-last :links="links" :loading="loading" />
    </div>
  </div>
</template>
