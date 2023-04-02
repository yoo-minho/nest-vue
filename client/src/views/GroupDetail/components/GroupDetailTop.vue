<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupDetailCounter from '@/components/Counter/GroupDetailCounter.vue';
import GroupDetailTopLoader from '@/components/Loader/GroupDetailTopLoader.vue';
import TagList from '@/components/TagList.vue';

const groupStore = useGroupStore();
const { currentGroup } = storeToRefs(groupStore);
const todayViews = computed(() => currentGroup.value?.todayViews || 0);
const totalViews = computed(() => currentGroup.value?.totalViews || 0);

const props = defineProps<{ loading: boolean }>();
</script>

<template>
  <template v-if="props.loading">
    <GroupDetailTopLoader />
  </template>
  <template v-else>
    <GroupDetailCounter :today-views="todayViews" :total-views="totalViews" />
    <GroupInfo :group-data="currentGroup" />
    <TagList v-slot="{ tagName }" name="InTeam" class="flex justify-center">#{{ tagName }}</TagList>
  </template>
</template>
