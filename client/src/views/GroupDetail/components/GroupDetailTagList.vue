<script setup lang="ts">
const props = defineProps<{ tags?: string[] }>();
const emits = defineEmits<{ (eventName: 'clickTag', tagName: string): void }>();
</script>

<template>
  <q-item class="row justify-center items-center q-py-none">
    <q-chip v-for="(name, i) in props.tags" :key="i" clickable @click="emits('clickTag', name)"> #{{ name }} </q-chip>
  </q-item>
</template>

<style lang="scss" scoped>
.q-chip {
  font-size: 12px;
}
</style>
