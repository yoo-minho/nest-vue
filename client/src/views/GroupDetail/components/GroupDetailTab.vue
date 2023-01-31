<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);

const router = useRouter();
const route = useRoute();
const selectTab = ref();
selectTab.value = route.name;

const tabArr = [
  { name: 'Link', label: `블로그` },
  { name: 'Post', label: `포스트` },
  { name: 'Stat', label: `통계` },
];

const moveTab = (tabName: string) => {
  router.push({ name: `GroupDetail${tabName}`, replace: true });
};
</script>

<template>
  <q-tabs
    v-model="selectTab"
    dense
    :class="`text-grey js-tab ${isDarkActive ? 'bg-dark' : 'bg-white'}`"
    :active-color="`${isDarkActive ? 'green-4' : 'primary'}`"
    :indicator-color="`${isDarkActive ? 'green-4' : 'primary'}`"
    narrow-indicator
  >
    <q-tab
      v-for="(tab, idx) in tabArr"
      :key="idx"
      :name="`GroupDetail${tab.name}`"
      :label="tab.label"
      @click="moveTab(tab.name)"
    />
  </q-tabs>
  <q-separator />
</template>

<style scoped>
.js-tab {
  position: sticky;
  top: 0;
  z-index: 99999;
}
</style>
