<script setup lang="ts">
const props = defineProps<{ tags?: string[] }>();
const emits = defineEmits<{ (eventName: 'clickTag', tagName: string): void }>();
const xx = (name: string): MouseEvent => emits('clickTag', name) as unknown as MouseEvent;
</script>

<template>
  <div class="tag-area row no-wrap justify-center">
    <q-chip v-for="(name, i) in props.tags" :key="i" clickable @click="emits('clickTag', name)"> #{{ name }} </q-chip>
  </div>
</template>

<style lang="scss" scoped>
.tag-area {
  margin-top: -10px;
  margin-bottom: 8px;

  .q-chip {
    font-size: 12px;
  }
}
</style>
