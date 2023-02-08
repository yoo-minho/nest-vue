<script setup lang="ts">
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { LinkWrap } from '@/types/common';
import { usePostStore } from '@/stores/post';
import GroupDetailStatJandiTip from './GroupDetailStatJandiTip.vue';
import GroupDetailStatJandiBox from './GroupDetailStatJandiBox.vue';
import GroupDetailStatJandiContents from './GroupDetailStatJandiContents.vue';

const postStore = usePostStore();
const { fetchJandis } = postStore;
const { jandis, jandiLoading, activeJandisCount, nextPostingDay, manyPostingMMM } = storeToRefs(postStore);

const props = defineProps<{ links: LinkWrap[] }>();

const defaultOption = { label: '전체 (블로그별 필터 가능)', value: -1 };
const linkFilterOptions = ref([defaultOption]);
const linkFilter = ref(defaultOption);

const filterCount = async (linkId = -1) => {
  if (props.links.length === 0) return;

  const targetLinks = linkId === -1 ? props.links : props.links.filter((l) => l.link.id === linkId);
  await fetchJandis(targetLinks);

  linkFilterOptions.value = [
    defaultOption,
    ...props.links.map(({ link }) => ({ label: link.title, value: link.id || -1 })),
  ];
};

watch(
  () => props.links,
  () => filterCount(),
  { immediate: true },
);
watch(
  () => linkFilter.value,
  (json) => filterCount(json.value),
);
</script>
<template>
  <div>
    <q-select
      v-model="linkFilter"
      :options="linkFilterOptions"
      filled
      label="Posting Graph By"
      label-color="green-4"
      class="q-mb-md"
    />
    <div class="row q-col-gutter-md q-mb-md">
      <GroupDetailStatJandiBox :loading="jandiLoading" :label="'다음 포스팅까지'" :value="nextPostingDay" />
      <GroupDetailStatJandiBox :loading="jandiLoading" :label="'포스팅 많은 요일'" :value="manyPostingMMM" />
    </div>
    <q-card class="bg-green-1">
      <q-card-section class="row jandi-zone">
        <GroupDetailStatJandiContents :loading="jandiLoading" :data="jandis" />
        <GroupDetailStatJandiTip :count="activeJandisCount" />
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.jandi-zone {
  justify-content: center;
}

@media (max-width: 400px) {
  .jandi-zone {
    justify-content: end;
    overflow-x: scroll;
  }
}
</style>
