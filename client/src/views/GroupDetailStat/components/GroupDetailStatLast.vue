<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';
import { Link } from '@/types/common';

const groupStore = useGroupStore();
const { fetchLastPosts } = groupStore;
const { lastPosts, lastLoading } = storeToRefs(groupStore);

type OrderType = 1 | -1;

const medal = (i: number) => ['🥇', '🥈', '🥉'][i] || '';
const isRank = (i: number) => i < 3;

const props = defineProps<{ links: { link: Link }[] }>();

const orderOptions = [
  { label: '최신순', value: 'asc', order: 1 },
  { label: '오래된순', value: 'desc', order: -1 },
] as { label: string; value: string; order: OrderType }[];
const currentOrder = ref(orderOptions[0]);

const sortPost = async (order: -1 | 1 = 1) => {
  if (props.links.length === 0) return;
  await fetchLastPosts(props.links, order);
};

onMounted(() => sortPost());
watch(
  () => props.links,
  () => sortPost(),
);
watch(
  () => currentOrder.value,
  (json: { order: OrderType }) => sortPost(json.order),
);
</script>
<template>
  <div>
    <q-select v-model="currentOrder" :options="orderOptions" filled label="Last Posting Date Ranking" class="q-my-md" />
    <q-card class="jandi-card">
      <q-card-section class="text-white">
        <div v-if="lastLoading" class="text-center">
          <q-spinner color="white" size="3em" />
        </div>
        <div v-else>
          <q-list dark bordered separator>
            <div v-for="(v, i) in lastPosts" :key="i" clickable>
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
        </div>
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
