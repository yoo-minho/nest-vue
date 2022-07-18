<script setup lang="ts">
import GroupDetailAsync from './GroupDetailAsync.vue';
import GroupDetailLoading from './GroupDetailLoading.vue';

const props = defineProps<{ id: string }>();

console.log({ props });

const id = String(props.id);
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
