<script setup lang="ts">
import { useRoute } from 'vue-router';
import GroupDetailAsync from './GroupDetailAsync.vue';
import GroupDetailLoading from './GroupDetailLoading.vue';

const route = useRoute();
const id = +route.params.id;
</script>

<template>
  <Suspense>
    <template #default>
      <GroupDetailAsync :id="id" />
    </template>
    <template #fallback>
      <GroupDetailLoading />
    </template>
  </Suspense>
</template>

<style></style>
