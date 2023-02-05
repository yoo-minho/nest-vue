<script setup lang="ts">
import { toRefs } from 'vue';
import { LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import GroupDetailStatLast from './components/GroupDetailStatLast/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi/GroupDetailStatJandi.vue';
import ContentsLayout from '@/layouts/ContentsLayout.vue';

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailStat');

const props = defineProps<{ links: LinkWrap[] }>();
const { links } = toRefs(props);
</script>

<template>
  <ContentsLayout>
    <div v-touch-swipe.mouse.left.right="_handleSwipe" class="q-px-md q-pb-md stat-area">
      <GroupDetailStatJandi :links="links" />
      <q-separator class="q-mt-md" />
      <GroupDetailStatLast :links="links" />
    </div>
  </ContentsLayout>
</template>
<style lang="scss">
@import './styles/_group-detail-stat.scss';
</style>
