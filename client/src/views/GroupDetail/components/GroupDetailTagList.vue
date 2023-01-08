<script setup lang="ts">
const props = defineProps<{ tags?: string[] }>();
</script>

<template>
  <div class="tag-area row no-wrap justify-center">
    <q-chip v-for="(name, i) in props.tags" :key="i">#{{ name }}</q-chip>
  </div>
</template>

<style lang="scss" scoped>
.tag-area {
  margin-top: -10px;

  .q-chip {
    font-size: 12px;
  }
}
</style>
