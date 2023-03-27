<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupDetailCounter from '@/components/Counter/GroupDetailCounter.vue';
import GroupDetailTopLoader from '@/components/Loader/GroupDetailTopLoader.vue';
import GroupDetailTagList from './GroupDetailTagList.vue';

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const dailyViews = computed(() => currentGroup.value?.dailyViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);
const tags = computed(() => currentGroup.value?.tags || []);
const router = useRouter();

const props = defineProps<{ loading: boolean }>();
const moveTeamByTag = (tagName: string) => {
  router.push({ name: 'Team', query: { tag: tagName } });
};
</script>

<template>
  <template v-if="props.loading">
    <GroupDetailTopLoader />
  </template>
  <template v-else>
    <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
    <GroupInfo :group-data="currentGroup" />
    <GroupDetailTagList v-if="tags.length > 0" :tags="tags.map(({ tag }) => tag.name)" @click-tag="moveTeamByTag" />
  </template>
</template>
