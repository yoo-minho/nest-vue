<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { ref, onMounted } from 'vue';
import GroupDetailPostCard from '@/views/GroupDetailPost/components/GroupDetailPostCard.vue';
import GroupDetailPostLoader from '@/components/Loader/GroupDetailPostLoader.vue';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';
import SearchEmpty from '@/components/Empty/SearchEmpty.vue';

const postStore = usePostStore();
const { fetchSearchPosts } = postStore;
const { posts, postLoading, searchWord } = storeToRefs(postStore);

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
</script>

<template>
  <template v-if="posts.length === 0">
    <SearchEmpty :no-result="!postLoading && searchWord?.length > 0" />
  </template>
  <template v-else>
    <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
    <ScrollObserver v-if="posts.length >= 20" @trigger-intersected="loadMore">
      <GroupDetailPostLoader />
    </ScrollObserver>
  </template>
</template>
