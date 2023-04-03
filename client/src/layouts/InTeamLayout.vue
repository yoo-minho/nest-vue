<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch } from 'vue';

const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);

const emits = defineEmits<{ (eventName: 'pull2refresh', done: () => void): void }>();

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);
</script>

<template>
  <div class="scroll-y" :class="`max-width ${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <q-scroll-area
      ref="scrollAreaRef"
      class="max-width without-header"
      :visible="false"
      style="overflow-x: hidden"
      :thumb-style="{ zIndex: '999999' }"
    >
      <q-layout style="min-height: 0">
        <q-page-container style="min-height: 0; padding: 0">
          <q-page>
            <q-pull-to-refresh @refresh="(done: () => void) => emits('pull2refresh', done)">
              <slot></slot>
            </q-pull-to-refresh>
          </q-page>
        </q-page-container>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="green-4" />
        </q-page-scroller>
      </q-layout>
    </q-scroll-area>
  </div>
</template>
