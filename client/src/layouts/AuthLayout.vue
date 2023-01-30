<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (eventName: 'close'): void }>();
const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);
</script>

<template>
  <q-layout class="subpage max-width" :class="`${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <HeaderItem type="SETTING" :title="props.title" :close="() => emits('close')" />
    <q-page-container class="max-width">
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>
