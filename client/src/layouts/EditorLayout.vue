<script setup lang="ts">
import { useQuasar } from 'quasar';
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import { ref, watch } from 'vue';

const $q = useQuasar();
const props = defineProps<{ title: string }>();
const emits = defineEmits<{ (eventName: 'close'): void; (eventName: 'save'): void }>();
const isMobile = $q.platform.is.mobile;
const isDarkActive = ref($q.dark.isActive);

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);
</script>

<template>
  <q-layout class="max-width subpage" :class="`${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <HeaderItem type="EDITOR" :close="() => emits('close')" :title="props.title" :save="() => emits('save')" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <q-page :class="{ 'q-pa-md': true, 'width-100vw': isMobile, 'max-width': true }">
          <q-form class="q-gutter-y-md column">
            <slot></slot>
          </q-form>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
<style scoped>
.width-100vw {
  width: 100vw;
}
</style>
