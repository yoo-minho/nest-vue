<script setup lang="ts">
import { useRoute } from 'vue-router';
import GroupDetailAsync from './GroupDetailAsync.vue';

const route = useRoute();
const id = +route.params.id;
</script>

<template>
  <Suspense>
    <template #default>
      <GroupDetailAsync :id="id" />
    </template>
    <template #fallback> 로딩중... </template>
  </Suspense>
</template>

<style></style>
