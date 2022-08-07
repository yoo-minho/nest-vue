<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const props = defineProps<{ linkCount: number; postCount: number }>();
const router = useRouter();
const route = useRoute();
const selectTab = ref();
selectTab.value = route.name;
const tabArr = [
  { name: 'Link', label: `플랫폼 (${props.linkCount})` },
  { name: 'Post', label: `포스트 (${props.postCount})` },
  { name: 'Stat', label: `통계` },
];
</script>

<template>
  <q-tabs v-model="selectTab" dense class="text-grey" active-color="primary" indicator-color="primary" narrow-indicator>
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

<style scoped></style>
