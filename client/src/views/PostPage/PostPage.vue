<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { ref, onMounted, watch } from 'vue';
import { useTagStore } from '@/stores/tag';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';
import PostListItem from '@/components/PostListItem.vue';
import PostListSkeletonItem from '@/components/PostListSkeletonItem.vue';
import PostTagList from './components/PostTagList.vue';

import { POST_TAG } from '@/constants';

const tagStore = useTagStore();
const { currentTag, isTotalTag } = storeToRefs(tagStore);

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

watch(
  () => currentTag.value,
  () => {
    postLoading.value = true;
    page.value = 1;

    searchWord.value = isTotalTag.value ? '' : POST_TAG.find((v) => v.label === currentTag.value)?.value || '';

    console.log(searchWord.value);

    fetchSearchPosts();
    page.value++;
  },
  { immediate: true },
);
</script>

<template>
  <PostTagList />
  <template v-if="postLoading && posts.length === 0">
    <PostListSkeletonItem v-for="i in 10" :key="i" />
  </template>
  <template v-else>
    <q-page class="q-mt-sm">
      <div class="max-width">
        <PostListItem v-for="(post, i) in posts" :key="i" :post="post" />
        <ScrollObserver v-if="posts.length >= 20" @trigger-intersected="loadMore">
          <PostListSkeletonItem />
        </ScrollObserver>
      </div>
    </q-page>
  </template>
</template>
