<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { usePostStore } from '@/stores/post';

const postStore = usePostStore();
const { searchWord, postLoading } = storeToRefs(postStore);
const { fetchSearchPosts } = postStore;
const router = useRouter();
</script>

<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar class="">
      <q-btn icon="arrow_back_ios" flat round dense @click="() => router.go(-1)" />
      <q-input
        v-model="searchWord"
        placeholder="팀, 포스트 검색"
        type="text"
        dense
        class="search-input-wrap"
        color="white"
        style="width: 100%"
        label-color="white"
        clearable
        :input-class="'search-input'"
        :loading="postLoading"
        debounce="500"
        @update:model-value="fetchSearchPosts()"
      >
        <template #append>
          <q-btn icon="search" color="white" flat dense @click="fetchSearchPosts()" />
        </template>
      </q-input>
    </q-toolbar>
  </q-header>
</template>

<style scope lang="scss">
.search-input-wrap {
  & button {
    color: white;
  }
}
.search-input {
  color: white;
  font-size: 1rem;
}
</style>
