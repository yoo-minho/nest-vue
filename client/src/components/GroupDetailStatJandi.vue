<script setup lang="ts">
import { computed, onMounted, ref, toRaw, watch } from 'vue';
import { DaysAllCounts, DaysCount, Link } from '../types/common';
import PostAPI from '../api/postApi';
import { isToday } from '../plugin/dayjs';

const MMM = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const day = [0, 1, 2, 3, 4, 5, 6];
const countKey = (linkId: number) => (linkId > 0 ? `linkCountBy${linkId}` : 'totalCount');

const props = defineProps<{ links: { link: Link }[] }>();
const { links } = toRaw(props);

const defaultOption = { label: '전체 (링크 선택 가능)', value: -1 };
const linkFilterOptions = [defaultOption, ...links.map(({ link }) => ({ label: link.title, value: link.id || -1 }))];
const linkFilter = ref();
linkFilter.value = defaultOption;

const jandiData = ref([] as DaysCount[]);
const activeJandi = computed(() => jandiData.value.filter(({ count }) => count > 0));
const jandiCnt = computed(() => activeJandi.value.reduce((total: number, val: DaysCount) => total + val.count, 0));
const NextPostingDay = computed(() => ((c) => (c > 0 ? `${Math.round((90 / c) * 100) / 100}일` : '-'))(jandiCnt.value));
const ManyPostingMMM = computed(() => {
  const dayOfWeek = day
    .map((d) => ({ day: d, count: activeJandi.value.filter(({ day }) => day === d).length }))
    .sort((x, y) => x.count - y.count)[0].day;
  return MMM[dayOfWeek] || '-';
});

let countBundle: DaysAllCounts[];
const filterCount = (linkId = -1) => {
  jandiData.value = countBundle.map((v: DaysAllCounts) => ({
    ...v,
    count: v.count ? v.count[countKey(linkId)] || 0 : 0,
  }));
};

onMounted(async () => {
  countBundle = await PostAPI.countByDate(links);
  filterCount();
});

watch(
  () => linkFilter.value,
  (json: { value: number }) => {
    if (json === null) return;
    filterCount(json.value);
  },
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
            <div class="text-h5">{{ NextPostingDay }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="jandi-card">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 12px">포스팅 많은 요일</div>
            <div class="text-h5">{{ ManyPostingMMM }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="jandi-card">
      <q-card-section class="row" style="align-items: center; justify-content: center">
        <div>
          <div class="column jandi-area">
            <div v-for="(v, i) in jandiData" :key="i" class="jandi-wrap">
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
            <div class="jandi-comment">{{ jandiCnt }} posting in the last 3 months</div>
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
