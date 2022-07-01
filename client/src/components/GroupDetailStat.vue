<script setup lang="ts">
import { enumerateDaysFromNMonths, getDateStringByMs, getAgoStringByMs, isToday } from '../plugin/dayjs';
import { CountGroup, DaysCount, Link, Post } from '../types/common';
import { computed, reactive, ref, toRaw, watch } from 'vue';

const medal = (i: number) => ['🥇', '🥈', '🥉'][i] || '';
const isRank = (i: number) => i < 3;

const props = defineProps<{ links: Link[]; rssResult: Post[][] }>();
const { links, rssResult } = toRaw(props);

const linkFilterOptions = [
  { label: '전체 (링크 선택 가능)', value: -1 },
  ...links.map((v, i) => ({ label: v.ogTitle, value: i })),
];
const linkFilter = ref(linkFilterOptions[0]);

const orderOptions = [
  { label: '오래된순', value: 1 },
  { label: '최신순', value: -1 },
];
const order = ref(orderOptions[0]);

const getLastPostitngDateByLink = (rssResult: Post[][], order: number) =>
  rssResult
    .map((rss) => rss[0] || {})
    .map(({ created, linkInfo }) => ({
      linkInfo: linkInfo || {},
      lastPostitngDate: created,
      dateString: getDateStringByMs(created),
      agoString: getAgoStringByMs(created),
    }))
    .sort((x, y) => (x.lastPostitngDate - y.lastPostitngDate) * order);

const lastPostitngDateByLink = reactive(getLastPostitngDateByLink(rssResult, 1));

const getJandiData = (posts: Post[]): DaysCount[] => {
  const postCounts = posts.reduce((total: CountGroup, { dateString }) => {
    total[dateString] = (total[dateString] || 0) + 1;
    return total;
  }, {});
  return enumerateDaysFromNMonths(3).map((v) => ({ ...v, count: postCounts[v.date] || 0 }));
};
const jandiData = reactive(getJandiData(rssResult.flat()));
const jandiCount = computed(() => jandiData.reduce((total, val: DaysCount) => total + val.count, 0));
const dayUntilNextPost = computed(() =>
  jandiCount.value === 0 ? '-' : Math.round((90 / jandiCount.value) * 100) / 100 + '일',
);
const manyPostingDays = computed(() => {
  let dayOfWeek = -1;
  const total = {} as CountGroup;
  jandiData.forEach(({ day, count }) => {
    if (count === 0) return;
    total[day] = (total[day] || 0) + 1;
    if (dayOfWeek === -1 || total[dayOfWeek] < total[day]) {
      dayOfWeek = day;
    }
  });
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek] || '-';
});

watch(
  () => order.value,
  (json: { value: number }) => {
    if (json === null) return;
    lastPostitngDateByLink.length = 0;
    lastPostitngDateByLink.push(...getLastPostitngDateByLink(rssResult, json.value));
  },
);

watch(
  () => linkFilter.value,
  (json: { value: number }) => {
    if (json === null) return;
    const idx = json.value;
    const isTotal = idx === -1;
    jandiData.length = 0;
    jandiData.push(...getJandiData(isTotal ? rssResult.flat() : rssResult[idx]));
  },
);
</script>

<template>
  <div>
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="jandi-card step-3">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 1rem">꾸준한 기록이 경쟁력 💪</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-separator class="q-my-md" />

    <q-select v-model="linkFilter" :options="linkFilterOptions" filled label="Posting Graph By" class="q-my-md" />

    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-6">
        <q-card class="jandi-card">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 12px">다음 포스팅까지</div>
            <div class="text-h5">{{ dayUntilNextPost }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-6">
        <q-card class="jandi-card">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 12px">포스팅 많은 요일</div>
            <div class="text-h5">{{ manyPostingDays }}</div>
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
              <div
                :class="{
                  jandi: true,
                  [`step-${v.count}`]: true,
                }"
              >
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
            <div class="jandi-comment">{{ jandiCount }} posting in the last 3 months</div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-separator class="q-mt-md" />

    <q-select v-model="order" :options="orderOptions" filled label="Last Posting Date Ranking" class="q-my-md" />

    <q-card class="jandi-card">
      <q-card-section>
        <div class="text-white">
          <q-list dark bordered separator>
            <q-item v-for="(v, i) in lastPostitngDateByLink" :key="i" clickable>
              <q-item-section class="col-8">
                <q-item-label class="text-weight-bold ellipsis text-subtitle2">
                  {{ v.linkInfo.ogTitle }}
                </q-item-label>
                <q-item-label class="ellipsis text-grey-5">Last Date : {{ v.dateString }}</q-item-label>
              </q-item-section>
              <q-item-section class="col-4">
                <q-item-label :class="{ 'rank-stirng': isRank(i) }"> Rank {{ i + 1 }} {{ medal(i) }} </q-item-label>
                <q-item-label :class="{ 'ago-string': isRank(i) }">{{ v.agoString }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped>
.jandi-card {
  background: #161b22;
}

.jandi-area {
  padding-top: 20px;
  height: 160px;
  width: 300px;
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

.rank-stirng {
  font-weight: bold;
  color: #39d353;
}

.ago-string {
  color: #26a641;
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
