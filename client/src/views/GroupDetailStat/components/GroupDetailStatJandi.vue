<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { Link } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import GroupDetailStatJandiTip from './GroupDetailStatJandiTip.vue';
import GroupDetailStatJandiBox from './GroupDetailStatJandiBox.vue';
import GroupDetailStatJandiContents from './GroupDetailStatJandiContents.vue';

const groupStore = useGroupStore();
const { fetchJandis } = groupStore;
const { jandis, jandiLoading, activeJandisCount, nextPostingDay, manyPostingMMM } = storeToRefs(groupStore);

const props = defineProps<{ links: { link: Link }[] }>();

const defaultOption = { label: '전체 (링크 선택 가능)', value: -1 };
const linkFilterOptions = ref([defaultOption]);
const linkFilter = ref(defaultOption);

const filterCount = async (linkId = -1) => {
  if (props.links.length === 0) return;
  await fetchJandis(props.links, linkId);
  linkFilterOptions.value = [
    defaultOption,
    ...props.links.map(({ link }) => ({ label: link.title, value: link.id || -1 })),
  ];
};

onMounted(() => filterCount());
watch(
  () => props.links,
  () => filterCount(),
);
watch(
  () => linkFilter.value,
  (json) => filterCount(json.value),
);
</script>
<template>
  <div>
    <q-select v-model="linkFilter" :options="linkFilterOptions" filled label="Posting Graph By" class="q-my-md" />
    <div class="row q-col-gutter-md q-mb-md">
      <group-detail-stat-jandi-box :loading="jandiLoading" :label="'다음 포스팅까지'" :value="nextPostingDay" />
      <group-detail-stat-jandi-box :loading="jandiLoading" :label="'포스팅 많은 요일'" :value="manyPostingMMM" />
    </div>
    <q-card class="jandi-card">
      <q-card-section class="row" style="align-items: center; justify-content: center">
        <group-detail-stat-jandi-contents :loading="jandiLoading" :data="jandis" />
        <group-detail-stat-jandi-tip :count="activeJandisCount" />
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.jandi-card {
  background: #161b22;
}
</style>
