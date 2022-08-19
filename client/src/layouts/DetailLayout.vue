<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useGroupStore } from '@/stores/group';
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import GroupDetailTab from '@/components/GroupDetail/GroupDetailTab.vue';
import GroupDetailTop from '@/components/GroupDetail/GroupDetailTop.vue';

const groupStore = useGroupStore();
const { fetchGroup } = groupStore;
const { groupLoading, currentGroup } = storeToRefs(groupStore);

const props = defineProps<{ domain: string }>();
const links = computed(() => currentGroup.value?.links || []);

onMounted(() => {
  groupLoading.value = true;
  fetchGroup(props.domain);
});
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <group-detail-top :loading="groupLoading" />
          <group-detail-tab />
          <router-view v-slot="{ Component, route }" :links="links" :loading="groupLoading">
            <transition name="tab">
              <component :is="Component" :key="route.path" style="position: absolute" />
            </transition>
          </router-view>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
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
