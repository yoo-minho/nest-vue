<script setup lang="ts">
import { BlogType, LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import ContentsLayout from '@/layouts/ContentsLayout.vue';
import GroupDetailLinkLoader from '@/components/Loader/GroupDetailLinkLoader.vue';
import GroupDetailLinkCard from './components/GroupDetailLinkCard.vue';
import { computed } from 'vue';
import PlatformStatList from '@/components/PlatformStatList.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailLink');

const counts = {} as { [key: string]: number };

const getStat = (_links: LinkWrap[]) => {
  _links.forEach(({ link: { type } }) => (counts[type] = (counts[type] || 0) + 1));
  const result: { type: BlogType; _count: number }[] = [];
  Object.keys(counts).forEach((type) => {
    const _type = type as BlogType;
    result.push({ type: _type, _count: counts[type] });
  });
  result.sort((a, b) => b._count - a._count);
  return result;
};

const linkCountByPlatform = computed(() => getStat(props.links));
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
        <q-separator spaced />
        <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
      </div>
    </template>
  </ContentsLayout>
</template>
