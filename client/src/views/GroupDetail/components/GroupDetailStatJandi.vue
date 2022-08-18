<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { Link } from '@/types/common';
import { isToday } from '@/plugin/dayjs';
import { useGroupStore } from '@/stores/group';

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
      <div class="col-6">
        <q-card class="jandi-card">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 12px">다음 포스팅까지</div>
            <div v-if="jandiLoading" class="text-h5">
              <q-spinner color="white" size="1.2em" />
            </div>
            <div v-else class="text-h5">{{ nextPostingDay }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="jandi-card">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 12px">포스팅 많은 요일</div>
            <div v-if="jandiLoading" class="text-h5">
              <q-spinner color="white" size="1.2em" />
            </div>
            <div v-else class="text-h5">{{ manyPostingMMM }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="jandi-card">
      <q-card-section class="row" style="align-items: center; justify-content: center">
        <div>
          <div v-if="jandiLoading" class="column jandi-area justify-center items-center">
            <q-spinner color="white" size="6em" :thickness="3" />
          </div>
          <div v-else class="column jandi-area">
            <div v-for="(v, i) in jandis" :key="i" class="jandi-wrap">
              <div class="jandi-month">{{ v.month }}</div>
              <div :class="{ jandi: true, [`step-${v.count}`]: true }">
                <q-tooltip>
                  {{ v.count === 0 ? 'No' : v.count }} posting on {{ v.date }}
                  {{ isToday(v.date) ? '(Today)' : '' }}
                </q-tooltip>
              </div>
            </div>
          </div>
        </div>

        <div class="column" style="align-items: center">
          <div class="row q-gutter-xs jandi-bottom">
            <div class="jandi-comment">Less</div>
            <div class="jandi step-0"></div>
            <div class="jandi step-1"></div>
            <div class="jandi step-2"></div>
            <div class="jandi step-3"></div>
            <div class="jandi step-4"></div>
            <div class="jandi-comment">More</div>
          </div>
          <div class="q-gutter-xs jandi-bottom">
            <div class="jandi-comment">{{ activeJandisCount }} posting in the last 3 months</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.jandi-area {
  padding-top: 20px;
  height: 160px;
  width: 300px;
}
.jandi-card {
  background: #161b22;
}

.jandi-wrap {
  width: auto;
  height: 14%;
}

.jandi-bottom {
  margin-top: 4px;
  align-items: center;
  color: #8b949e;
}

.jandi-month {
  position: absolute;
  top: 12px;
  color: #f0f6fc;
}

.jandi {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  outline-offset: -1px;
}

.step-0 {
  background: #161b22;
}

.step-1 {
  background: #0e4429;
}

.step-2 {
  background: #006d32;
}

.step-3 {
  background: #26a641;
}

.step-4 {
  background: #39d353;
}
</style>
