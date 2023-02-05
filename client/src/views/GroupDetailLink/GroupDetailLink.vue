<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailLink');
</script>

<template>
  <ContentsLayout>
    <template v-if="props.loading">
      <GroupDetailLinkLoader />
    </template>
    <template v-else>
      <div v-touch-swipe.mouse.left.right="_handleSwipe">
        <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
      </div>
    </template>
  </ContentsLayout>
</template>
