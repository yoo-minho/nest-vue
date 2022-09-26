<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';

const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (eventName: 'close'): void; (eventName: 'save'): void }>();
</script>

<template>
  <q-layout class="max-width subpage">
    <HeaderItem :close="() => emits('close')" :title="props.title" :save="() => emits('save')" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <q-page class="q-pa-md" style="width: 100vw">
          <q-form class="q-gutter-y-md column">
            <slot></slot>
          </q-form>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
