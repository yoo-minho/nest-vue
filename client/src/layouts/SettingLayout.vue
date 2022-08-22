<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';

const props = defineProps<{ title: string }>();

const emits = defineEmits<{ (eventName: 'back'): void }>();
</script>

<template>
  <q-layout class="subpage max-width">
    <HeaderItem :title="props.title" :back="() => emits('back')" />
    <q-page-container class="max-width">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
