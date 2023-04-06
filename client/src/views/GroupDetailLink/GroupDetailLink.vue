<script setup lang="ts">
import { computed } from 'vue';
import { LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';
import PlatformStatList from '@/components/PlatformStatList.vue';
import { getPlatformStat } from '@/hooks/usePlatformStat';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailLink');

const linkCountByPlatform = computed(() => getPlatformStat(props.links));
</script>

<template>
  <ContentsLayout>
    <template v-if="props.loading">
      <GroupDetailLinkLoader />
    </template>
    <template v-else>
      <div v-touch-swipe.mouse.left.right="_handleSwipe">
        <div class="row q-px-sm">
          <PlatformStatList :link-count-by-platform="linkCountByPlatform" />
        </div>
        <q-separator spaced style="height: 8px" />
        <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
      </div>
    </template>
  </ContentsLayout>
</template>
