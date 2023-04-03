<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import MainHeader from '@/components/Menu/MainHeader.vue';

const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);
const userStore = useUserStore();
const { isExistsUser, profileImage, mainTab } = storeToRefs(userStore);
const { fetchUser } = userStore;
const route = useRoute();

const emits = defineEmits<{ (eventName: 'pull2refresh', done: () => void): void }>();

onMounted(() => {
  fetchUser();
});

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);

const isInTeam = () => String(route.name).includes('GroupDetail');
const scrollAreaRef = ref();

watch(
  () => mainTab.value,
  (mainTab) => {
    if (+mainTab.replace('t_', '') % 5 === 0) return; //5의배수??
    scrollAreaRef.value.setScrollPosition('vertical', 0);
  },
);
</script>

<template>
  <div v-show="!isInTeam()" :class="`max-width ${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <q-scroll-area
      ref="scrollAreaRef"
      class="max-width without-header"
      :visible="false"
      style="height: 100vh; overflow: hidden"
    >
      <MainHeader style="position: relative" />
      <div style="position: sticky; top: 0; z-index: 1">
        <q-tabs v-model="mainTab" class="bg-dark text-white shadow-2" align="justify">
          <q-route-tab to="/" label="Team" style="flex: 1" no-caps />
          <q-route-tab to="/blogs" label="Blog" style="flex: 1" no-caps />
          <q-route-tab to="/posts" label="Post" style="flex: 1" no-caps />
          <q-route-tab to="/noti" icon="notifications" style="flex: 1" no-caps />
          <q-route-tab to="/my" style="flex: 1" no-caps>
            <q-btn v-if="isExistsUser" flat round>
              <q-avatar size="28px">
                <img :src="profileImage" />
              </q-avatar>
            </q-btn>
            <q-btn v-else icon="account_circle" flat round />
          </q-route-tab>
        </q-tabs>
      </div>
      <q-layout style="min-height: 0">
        <q-page-container style="min-height: 0; padding: 0">
          <q-page>
            <q-pull-to-refresh @refresh="(done: () => void) => emits('pull2refresh', done)">
              <slot></slot>
            </q-pull-to-refresh>
          </q-page>
        </q-page-container>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="green-5" />
        </q-page-scroller>
      </q-layout>
    </q-scroll-area>
  </div>
  <div v-if="isInTeam()">
    <slot></slot>
  </div>
</template>
<style lang="scss">
.q-tab--active {
  color: $green-5;
  scale: 1.1;
}
.q-pull-to-refresh__puller {
  // z-index: -1;
  // display: none;
}
</style>
