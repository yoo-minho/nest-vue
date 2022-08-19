<script setup lang="ts">
import { Link } from '@/types/common';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
</script>

<template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <div class="max-width">
        <template v-if="props.loading">
          <group-detail-link-loader />
        </template>
        <template v-else>
          <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
        </template>
      </div>
    </q-item-section>
  </q-item>
</template>
