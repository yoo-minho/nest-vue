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
    <q-pull-to-refresh @refresh="(done: () => void) => emits('pull2refresh', done)">
      <q-layout style="min-height: 0">
        <q-page-container style="padding: 0">
          <q-scroll-area
            ref="scrollAreaRef"
            class="max-width without-header"
            :visible="false"
            style="height: 100vh; overflow-x: hidden"
            :thumb-style="{ zIndex: '999999' }"
          >
            <MainHeader style="position: relative" />
            <div style="position: sticky; top: 0; z-index: 1">
              <q-tabs v-model="mainTab" class="bg-dark text-white shadow-2" align="justify">
                <q-route-tab to="/" icon="workspaces_outline" style="flex: 1" />
                <q-route-tab to="/blogs" icon="rss_feed" style="flex: 1" />
                <q-route-tab to="/posts" icon="local_fire_department" style="flex: 1" />
                <q-route-tab to="/noti" icon="notifications" style="flex: 1" />
                <q-route-tab to="/my" style="flex: 1">
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
                <slot></slot>
              </q-page-container>
              <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
                <q-btn fab icon="keyboard_arrow_up" color="green-5" />
              </q-page-scroller>
            </q-layout>
          </q-scroll-area>
        </q-page-container>
      </q-layout>
    </q-pull-to-refresh>
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
</style>
