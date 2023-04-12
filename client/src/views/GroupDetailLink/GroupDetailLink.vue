<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';
import PlatformStatList from '@/components/PlatformStatList.vue';
import { getPlatformStat } from '@/hooks/usePlatformStat';

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const { currentGroup, groupLoading } = storeToRefs(groupStore);
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailLink');

const linkCountByPlatform = computed(() => getPlatformStat(currentGroup.value.links as LinkWrap[]));
</script>

<template>
  <ContentsLayout>
    <template v-if="groupLoading">
      <GroupDetailLinkLoader />
    </template>
    <template v-else>
      <div v-touch-swipe.mouse.left.right="_handleSwipe">
        <div class="row q-px-sm">
          <PlatformStatList :link-count-by-platform="linkCountByPlatform" />
        </div>
        <q-separator spaced style="height: 8px" />
        <GroupDetailLinkCard v-for="({ link }, i) in currentGroup?.links" :key="i" :link="link" />
      </div>
    </template>
  </ContentsLayout>
</template>
