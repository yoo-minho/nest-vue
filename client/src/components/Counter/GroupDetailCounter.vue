<script setup lang="ts">
const props = defineProps<{ dailyViews: number; totalViews: number }>();
</script>

<template>
  <div class="q-pt-md q-px-md row justify-between">
    <q-badge color="primary" :label="'today : ' + props.dailyViews" />
    <q-badge color="green-4" :label="'total : ' + props.totalViews" />
  </div>
</template>
