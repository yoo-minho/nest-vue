<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailPostList from './components/GroupDetailPostList.vue';

defineProps<{ links: LinkWrap[] }>();
</script>

<template>
  <ContentsLayout>
    <GroupDetailPostList :links="links" />
  </ContentsLayout>
</template>
