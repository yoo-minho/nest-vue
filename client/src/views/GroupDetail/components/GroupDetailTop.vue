<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { usePostStore } from '@/stores/post';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupDetailCounter from '@/components/Counter/GroupDetailCounter.vue';
import GroupDetailTopLoader from '@/components/Loader/GroupDetailTopLoader.vue';

const groupStore = useGroupStore();
const { currentGroup, minScrapAt } = storeToRefs(groupStore);
const dailyViews = computed(() => currentGroup.value?.dailyViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);

const postStore = usePostStore();
const { scrapLoading } = storeToRefs(postStore);

const props = defineProps<{ loading: boolean }>();
</script>

<template>
  <template v-if="props.loading">
    <GroupDetailTopLoader />
  </template>
  <template v-else>
    <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
    <GroupInfo mode="HEADER" :group-data="currentGroup" />
    <div class="q-pb-md justify-center">
      <template v-if="scrapLoading">
        <q-linear-progress dark rounded indeterminate color="green-4" class="q-mt-sm" />
        <q-linear-progress dark rounded query color="green-2" class="q-mt-sm" />
      </template>
      <template v-else>
        <q-item class="q-pa-none" style="min-height: 0">
          <q-item-section class="text-grey-5 text-center"> {{ minScrapAt }} </q-item-section>
        </q-item>
      </template>
    </div>
  </template>
</template>
