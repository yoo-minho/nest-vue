<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import GroupDetailStatLast from './components/GroupDetailStatLast/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi/GroupDetailStatJandi.vue';
import GroupDetailStatDonut from './components/GroupDetailStatDonut.vue';
import ContentsLayout from '@/layouts/ContentsLayout.vue';

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const { currentGroup } = storeToRefs(groupStore);
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailStat');
</script>

<template>
  <ContentsLayout>
    <div v-touch-swipe.mouse.left.right="_handleSwipe" class="q-px-md q-pb-md q-mt-sm stat-area">
      <GroupDetailStatJandi :links="currentGroup?.links || []" />

      <q-separator class="q-my-md" />

      <GroupDetailStatLast :links="currentGroup?.links || []" />

      <q-separator class="q-my-md" />

      <GroupDetailStatDonut :links="currentGroup?.links || []" />
    </div>
  </ContentsLayout>
</template>
<style lang="scss">
@import './styles/_group-detail-stat.scss';
</style>
