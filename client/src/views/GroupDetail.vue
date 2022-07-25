<script setup lang="ts">
import GroupDetailAsync from './GroupDetailAsync.vue';
import GroupDetailLoading from './GroupDetailLoading.vue';

const props = defineProps<{ domain: string }>();
</script>

<template>
  <Suspense>
    <template #default>
      <GroupDetailAsync :domain="props.domain" />
    </template>
    <template #fallback>
      <GroupDetailLoading />
    </template>
  </Suspense>
</template>

<style></style>
