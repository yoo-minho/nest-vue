<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { ref, onMounted } from 'vue';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';
import SearchEmpty from '@/components/Empty/SearchEmpty.vue';
import PostListItem from '@/components/PostListItem.vue';
import PostListSkeletonItem from '@/components/PostListSkeletonItem.vue';
import PostTagList from './components/PostTagList.vue';

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
console.log('asdsad');
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
