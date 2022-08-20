<script setup lang="ts">
import { Link } from '@/types/common';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
</script>

<template>
  <ContentsLayout>
    <template v-if="props.loading">
      <group-detail-link-loader />
    </template>
    <template v-else>
      <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
    </template>
  </ContentsLayout>
</template>
