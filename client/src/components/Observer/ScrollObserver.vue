<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import GroupDetailPostLoader from '../Loader/GroupDetailPostLoader.vue';

const emits = defineEmits<{
  (eventName: 'triggerIntersected', value: Element): void;
  (eventName: 'refreshIcon'): void;
}>();

const trigger = ref();
const options = {
  root: null,
  threshold: 0,
};
let observer: IntersectionObserver | null = null;
const handleIntersect = (entry: IntersectionObserverEntry): void => {
  if (entry.isIntersecting) emits('triggerIntersected', trigger.value);
};
onMounted(() => {
  try {
    observer = new IntersectionObserver((entries) => {
      handleIntersect(entries[0]);
    }, options);
    observer.observe(trigger.value);
  } catch (err) {
    console.error(err);
  }
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>
<template>
  <div ref="trigger"><GroupDetailPostLoader /></div>
</template>
