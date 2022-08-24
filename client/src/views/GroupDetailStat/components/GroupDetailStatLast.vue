<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { usePostStore } from '@/stores/post';
import { LinkWrap, OrderType } from '@/types/common';

const postStore = usePostStore();
const { fetchLastPosts } = postStore;
const { lastPosts, lastLoading } = storeToRefs(postStore);

const medal = (i: number) => ['🥇', '🥈', '🥉'][i] || '';
const isRank = (i: number) => i < 3;

const props = defineProps<{ links: LinkWrap[] }>();

const orderOptions = [
  { label: '최신순', value: 'asc', order: 1 },
  { label: '오래된순', value: 'desc', order: -1 },
] as { label: string; value: string; order: OrderType }[];
const currentOrder = ref(orderOptions[0]);
const sortPost = (order: OrderType = 1) => fetchLastPosts(props.links, order);

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
    <q-card class="bg-dark">
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
                  <q-item-label :class="{ 'text-green-5': isRank(i), 'text-weight-bold': isRank(i) }">
                    Rank {{ i + 1 }} {{ medal(i) }}
                  </q-item-label>
                  <q-item-label :class="{ 'text-green-4': isRank(i) }">{{ v.agoString }}</q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
