<script setup lang="ts">
import { LinkWrap } from '@/types/common';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { ref, watch } from 'vue';
import GroupDetailPostCard from './GroupDetailPostCard.vue';
import GroupDetailPostEmpty from '@/components/Empty/GroupDetailPostEmpty.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';

const postStore = usePostStore();
const { fetchPosts } = postStore;
const { posts, postLoading } = storeToRefs(postStore);

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
  console.log('xxxx', document.querySelectorAll('.vue-recycle-scroller__item-view').length);
};
</script>

<template>
  <template v-if="postLoading">
    <GroupDetailPostLoader />
  </template>
  <template v-else-if="posts.length === 0">
    <GroupDetailPostEmpty />
  </template>
  <template v-else>
    <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
    <ScrollObserver @trigger-intersected="loadMore" />
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
