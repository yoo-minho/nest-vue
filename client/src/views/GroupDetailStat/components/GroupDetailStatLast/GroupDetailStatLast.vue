<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';
import { LinkWrap, OrderType } from '@/types/common';
import GroupDetailStatLastItem from './GroupDetailStatLastItem.vue';

type OrderOptions = { label: string; value: string; order: OrderType }[];

const postStore = usePostStore();
const { fetchLastPosts } = postStore;
const { lastPosts, lastLoading } = storeToRefs(postStore);
const props = defineProps<{ links: LinkWrap[] }>();
const orderOptions: OrderOptions = [
  { label: '최신순', value: 'asc', order: 1 },
  { label: '오래된순', value: 'desc', order: -1 },
];
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
            <GroupDetailStatLastItem v-for="(v, i) in lastPosts" :key="i" :last-post="v" :i="i" clickable />
          </q-list>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
