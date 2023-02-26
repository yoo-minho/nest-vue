<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { usePostStore } from '@/stores/post';
import { ref, onMounted } from 'vue';
import GroupDetailPostCard from '@/views/GroupDetailPost/components/GroupDetailPostCard.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';
import SearchEmpty from '@/components/Empty/SearchEmpty.vue';

const postStore = usePostStore();
const { fetchSearchPosts } = postStore;
const { posts, postLoading } = storeToRefs(postStore);

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;

const page = ref(1);

onMounted(() => {
  postLoading.value = true;
  fetchSearchPosts();
  page.value++;
});

const loadMore = async (el: Element) => {
  const existsPosts = await fetchSearchPosts(page.value);
  if (existsPosts) {
    page.value++;
  } else {
    el.innerHTML = '';
  }
};

const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailPost');
</script>

<template>
  <template v-if="posts.length === 0">
    <SearchEmpty />
  </template>
  <template v-else>
    <div v-touch-swipe.mouse.left.right="_handleSwipe">
      <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
      <ScrollObserver v-if="posts.length >= 20" @trigger-intersected="loadMore">
        <GroupDetailPostLoader />
      </ScrollObserver>
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
