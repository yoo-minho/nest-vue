<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';
import { usePostStore } from '@/stores/post';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupDetailTab from './components/GroupDetailTab.vue';
import GroupDetailTop from './components/GroupDetailTop.vue';

const groupStore = useGroupStore();
const { initGroupData, fetchGroup } = groupStore;
const { groupLoading, currentGroup } = storeToRefs(groupStore);

const postStore = usePostStore();
const { scrapPosts, initPostData } = postStore;

const props = defineProps<{ domain: string }>();
const links = computed(() => currentGroup.value?.links || []);

initGroupData();
initPostData();

onMounted(async () => {
  await fetchGroup(props.domain);
  const { id: groupId, links } = currentGroup.value;
  if (!links) return;

  await scrapPosts(links, true, groupId);
});
</script>

<template>
  <DefaultLayout>
    <GroupDetailTop :loading="groupLoading" />
    <GroupDetailTab />
    <router-view v-slot="{ Component, route }" :links="links" :loading="groupLoading">
      <transition name="tab">
        <component :is="Component" :key="route.path" style="position: absolute" />
      </transition>
    </router-view>
  </DefaultLayout>
</template>

<style scoped>
.tab-enter-from,
.tab-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.tab-enter-active,
.tab-leave-active {
  transition: all 0.5s ease;
}

.tab-enter-to,
.tab-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
</style>
