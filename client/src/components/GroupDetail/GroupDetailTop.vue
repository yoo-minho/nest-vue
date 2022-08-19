<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupDetailCounter from '@/components/Counter/GroupDetailCounter.vue';
import GroupDetailTopLoader from '@/components/Loader/GroupDetailTopLoader.vue';

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const dailyViews = computed(() => currentGroup.value?.dailyViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);

const props = defineProps<{ loading: boolean }>();
</script>

<template>
  <template v-if="props.loading">
    <group-detail-top-loader />
  </template>
  <template v-else>
    <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
    <GroupInfo mode="HEADER" :group-data="currentGroup" />
  </template>
</template>
