<script setup lang="ts">
import { toRefs } from 'vue';
import { LinkWrap } from '@/types/common';
import GroupDetailStatBanner from './components/GroupDetailStatBanner.vue';
import GroupDetailStatLast from './components/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi.vue';
import ContentsLayout from '@/layouts/ContentsLayout.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
const { links } = toRefs(props);
</script>

<template>
  <contents-layout>
    <div class="q-px-md q-pb-md">
      <group-detail-stat-banner />
      <q-separator class="q-my-md" />
      <group-detail-stat-jandi :links="links" :loading="loading" />
      <q-separator class="q-mt-md" />
      <group-detail-stat-last :links="links" :loading="loading" />
    </div>
  </contents-layout>
</template>
