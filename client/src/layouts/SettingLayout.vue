<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import { ref, watch } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (eventName: 'back'): void }>();
const isDarkActive = ref($q.dark.isActive);

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);
</script>

<template>
  <q-layout class="subpage max-width" :class="`${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <HeaderItem type="SETTING" :title="props.title" :back="() => emits('back')" />
    <q-page-container class="max-width">
      <q-scroll-area class="max-width without-header" :visible="false" :thumb-style="{ zIndex: '999999' }">
        <slot></slot>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
