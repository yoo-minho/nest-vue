<script setup lang="ts">
import { LastPost, Link } from '../types/common';
import { onMounted, ref, toRaw, watch } from 'vue';
import PostAPI from '../api/postApi';

const medal = (i: number) => ['🥇', '🥈', '🥉'][i] || '';
const isRank = (i: number) => i < 3;

const props = defineProps<{ links: { link: Link }[] }>();
const { links } = toRaw(props);

const orderOptions = [
  { label: '최신순', value: 'asc', order: 1 },
  { label: '오래된순', value: 'desc', order: -1 },
];

const currentOrder = ref();
currentOrder.value = orderOptions[0];

const sortPost = (order: 1 | -1) => {
  const time = (date: string) => new Date(date).getTime();
  return [...lastPosts].sort((x, y) => order * (time(x.createdAt) - time(y.createdAt)));
};
const lastPostitngDateByLink = ref();
let lastPosts: LastPost[];
const isJandiLoading = ref(true);

onMounted(async () => {
  const { isLoading, data } = await PostAPI.findLast(links);
  console.log('findLast2', { isLoading, data });
  lastPosts = data;
  isJandiLoading.value = isLoading.value;
  lastPostitngDateByLink.value = sortPost(currentOrder.value.order);
});

watch(
  () => currentOrder.value,
  (json: { order: 1 | -1 }) => {
    if (json === null) return;
    lastPostitngDateByLink.value = sortPost(json.order);
  },
);
</script>
<template>
  <div>
    <q-select v-model="currentOrder" :options="orderOptions" filled label="Last Posting Date Ranking" class="q-my-md" />
    <q-card class="jandi-card">
      <q-card-section class="text-white">
        <q-list dark bordered separator>
          <div v-if="isJandiLoading">로딩중...</div>
          <div v-for="(v, i) in lastPostitngDateByLink" :key="i" clickable>
            <q-item>
              <q-item-section class="col-8">
                <q-item-label class="text-weight-bold ellipsis text-subtitle2">
                  {{ v.title }}
                </q-item-label>
                <q-item-label class="ellipsis text-grey-5">Last Date : {{ v.dateString }}</q-item-label>
              </q-item-section>
              <q-item-section class="col-4">
                <q-item-label :class="{ 'rank-stirng': isRank(i) }"> Rank {{ i + 1 }} {{ medal(i) }}</q-item-label>
                <q-item-label :class="{ 'ago-string': isRank(i) }">{{ v.agoString }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>
<style scoped>
.jandi-card {
  background: #161b22;
}

.rank-stirng {
  font-weight: bold;
  color: #39d353;
}

.ago-string {
  color: #26a641;
}
</style>
