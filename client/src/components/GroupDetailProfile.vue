<script setup lang="ts">
import GroupDetailCounter from '../components/GroupDetailCounter.vue';
import GroupCard from '../components/GroupCard.vue';

import { computed } from 'vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const dailyViews = computed(() => currentGroup.value?.dailyViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);

const props = defineProps<{ loading: boolean }>();
const loadingItem = [
  { width: '30%', height: '20px' },
  { width: '40%', height: '30px' },
  { width: '60%', height: '20px' },
];
</script>

<template>
  <div v-if="props.loading">
    <div class="q-pt-md q-px-md row justify-between">
      <q-skeleton v-for="n in 2" :key="n" type="text" width="15%" height="20px" />
    </div>
    <div>
      <q-item>
        <q-item-section>
          <q-list>
            <q-item v-for="(v, i) in loadingItem" :key="i" class="q-pa-none row justify-center" style="min-height: 0">
              <q-skeleton type="text" :width="v.width" :height="v.height" />
            </q-item>
          </q-list>
        </q-item-section>
      </q-item>
    </div>
  </div>
  <div v-else>
    <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
    <GroupCard mode="HEADER" :group-data="currentGroup" />
  </div>
</template>

<style scoped></style>
