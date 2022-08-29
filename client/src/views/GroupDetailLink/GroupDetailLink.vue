<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
</script>

<template>
  <ContentsLayout>
    <template v-if="props.loading">
      <GroupDetailLinkLoader />
    </template>
    <template v-else>
      <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
    </template>
  </ContentsLayout>
</template>
