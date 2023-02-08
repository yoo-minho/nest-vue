<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { usePostStore } from '@/stores/post';
import { ref, watch } from 'vue';
import GroupDetailPostCard from './GroupDetailPostCard.vue';
import GroupDetailPostEmpty from '@/components/Empty/GroupDetailPostEmpty.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';

const postStore = usePostStore();
const { fetchPosts } = postStore;
const { posts, postLoading } = storeToRefs(postStore);

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;

const props = defineProps<{ links: LinkWrap[] }>();
const page = ref(1);

watch(
  () => props.links,
  (links) => {
    if (links.length === 0) return;
    postLoading.value = true;
    fetchPosts(links);
    page.value++;
  },
  { immediate: true },
);

const loadMore = async (el: Element) => {
  const existsPosts = await fetchPosts(props.links, page.value);
  if (existsPosts) {
    page.value++;
  } else {
    el.innerHTML = '';
  }
};

const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => {
  if (page.value > 2) return; //Todo. 스크롤 내렸을땐 좌우가 안 움직이도록!
  return handleSwipeTab(newInfo.direction, 'GroupDetailPost');
};
</script>

<template>
  <template v-if="postLoading">
    <q-item-label v-for="n in 20" :key="n">
      <GroupDetailPostLoader />
    </q-item-label>
  </template>
  <template v-else-if="posts.length === 0">
    <GroupDetailPostEmpty />
  </template>
  <template v-else>
    <div v-touch-swipe.mouse.left.right="_handleSwipe">
      <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
      <ScrollObserver @trigger-intersected="loadMore" />
    </div>
  </template>
</template>
<style scoped>
.scroller {
  height: 100%;
}
.user {
  height: 32%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
</style>
