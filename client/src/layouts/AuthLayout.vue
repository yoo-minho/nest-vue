<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';

const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (eventName: 'close'): void }>();
</script>

<template>
  <q-layout class="subpage max-width">
    <HeaderItem type="SETTING" :title="props.title" :close="() => emits('close')" />
    <q-page-container class="max-width">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
