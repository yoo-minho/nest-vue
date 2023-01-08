<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const selectTab = ref();
selectTab.value = route.name;

const tabArr = [
  { name: 'Link', label: `블로그` },
  { name: 'Post', label: `포스트` },
  { name: 'Stat', label: `통계` },
];
</script>

<template>
  <q-tabs
    v-model="selectTab"
    dense
    class="text-grey js-tab"
    active-color="primary"
    indicator-color="primary"
    narrow-indicator
  >
    <q-tab
      v-for="(tab, idx) in tabArr"
      :key="idx"
      :name="`GroupDetail${tab.name}`"
      :label="tab.label"
      @click="router.push({ name: `GroupDetail${tab.name}` })"
    />
  </q-tabs>
  <q-separator />
</template>

<style scoped>
.js-tab {
  position: sticky;
  top: 0;
  background: white;
  z-index: 99999;
}
</style>
