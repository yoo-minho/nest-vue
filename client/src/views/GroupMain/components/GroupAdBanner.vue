<script setup lang="ts">
defineProps<{ contents: string; icon: string }>();
const emits = defineEmits<{ (eventName: 'clickBanner'): void }>();
</script>

<template>
  <q-banner class="bg-green-4 text-white q-mb-md cursor-pointer shadow-1" rounded dense @click="emits('clickBanner')">
    <div style="display: flex; justify-content: space-between; align-items: center">
      <q-icon class="col-1" :name="icon" size="24px" />
      <span class="col-8 q-mx-sm" style="font-size: 1em">{{ contents }}</span>
      <q-icon class="col-1" name="ads_click" size="24px" />
    </div>
  </q-banner>
</template>
