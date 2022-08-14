<script setup lang="ts">
import HeaderItem from '../components/HeaderItem.vue';
import GroupDetailTab from '../components/GroupDetailTab.vue';
import GroupDetailProfile from '../components/GroupDetailProfile.vue';

import { useGroupStore } from '../stores/group';
import { onMounted, computed } from 'vue';
import { storeToRefs } from 'pinia';

const groupStore = useGroupStore();
const { loadGroup } = groupStore;
const { groupLoading, currentGroup } = storeToRefs(groupStore);

const props = defineProps<{ domain: string }>();
const links = computed(() => currentGroup.value?.links || []);

onMounted(() => {
  groupLoading.value = true;
  loadGroup(props.domain);
});
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <GroupDetailProfile :loading="groupLoading" />
          <GroupDetailTab />
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
