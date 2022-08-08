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

onMounted(async () => {
  await loadGroup(props.domain);
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
          <router-view :links="links" :loading="groupLoading" />
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
