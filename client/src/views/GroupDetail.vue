<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import GroupDetailCounter from '../components/GroupDetailCounter.vue';
import GroupDetailTab from '../components/GroupDetailTab.vue';
import GroupDetailLoading from './GroupDetailLoading.vue';

import { useGroupStore } from '../stores/group';
import { onMounted, ref, computed } from 'vue';
import { delay } from '../util';
import { storeToRefs } from 'pinia';

const groupStore = useGroupStore();
const { loadGroup } = groupStore;
const { currentGroup } = storeToRefs(groupStore);

const props = defineProps<{ domain: string }>();

const loading = ref(true);

const links = computed(() => currentGroup.value?.links);
const dailyViews = computed(() => currentGroup.value?.dailyViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);

onMounted(async () => {
  await loadGroup(props.domain);
  await delay(1000);
  loading.value = false;
});
</script>

<template>
  <div v-if="loading">
    <GroupDetailLoading />
  </div>
  <q-layout v-else class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
          <GroupCard mode="HEADER" :group-data="currentGroup" />
          <GroupDetailTab />
          <q-separator />
          <router-view :links="links" />
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
