<script setup lang="ts">
import { useQuasar } from 'quasar';
import { storeToRefs } from 'pinia';
import { ref, watch, onMounted } from 'vue';
import { showBottomSheet } from '@/hooks/useInstallBottomSheeet';
import { useSubpageStore } from '@/stores/subpage';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import SettingSubpage from './components/Setting/SettingSubpage.vue';
import MainHeader from './components/Menu/MainHeader.vue';
import InTeamHeader from './components/Menu/InTeamHeader.vue';

const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);
const userStore = useUserStore();
const { isExistsUser, profileImage, mainTab } = storeToRefs(userStore);
const { fetchUser } = userStore;
const subpageStore = useSubpageStore();
const { isOpenGroupEditor, isOpenLinkEditor, isOpenSettingSubpage, isOpenDataSubpage, isOpenLoginSubpage } =
  storeToRefs(subpageStore);
const route = useRoute();

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);

onMounted(() => {
  if (window.location.pathname === '/') {
    setTimeout(() => (mainTab.value = 't_0'), 0);
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    showBottomSheet(e as BeforeInstallPromptEvent);
  });
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
  });

  fetchUser();
});

const refresh = async (done: () => void) => {
  // await scrapPostsAndAction(); //post
  done();
};

const isInTeam = () => String(route.name).includes('GroupDetail');

const scrollAreaRef = ref();
watch(
  () => mainTab.value,
  () => scrollAreaRef.value.setScrollPosition('vertical', 0),
);
</script>

<template>
  <div :class="`max-width ${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <q-layout style="min-height: 0">
      <div id="subpage">
        <transition-group name="subpage">
          <GroupEditor v-if="isOpenGroupEditor" />
          <LinkEditor v-if="isOpenLinkEditor" />
          <SettingSubpage v-if="isOpenSettingSubpage" />
          <DataSubpage v-if="isOpenDataSubpage" />
          <LoginSubpage v-if="isOpenLoginSubpage" />
        </transition-group>
      </div>
      <q-page-container style="padding: 0">
        <q-pull-to-refresh @refresh="refresh">
          <q-scroll-area
            ref="scrollAreaRef"
            class="max-width without-header"
            :visible="false"
            style="height: 100vh; overflow-x: hidden"
            :thumb-style="{ zIndex: '999999' }"
          >
            <template v-if="isInTeam()">
              <InTeamHeader style="position: relative" />
            </template>
            <template v-else>
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
            </template>
            <q-layout style="min-height: 0">
              <q-page-container style="min-height: 0">
                <router-view v-slot="{ Component }">
                  <transition>
                    <keep-alive include="Team">
                      <component :is="Component" />
                    </keep-alive>
                  </transition>
                </router-view>
              </q-page-container>
              <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
                <q-btn fab icon="keyboard_arrow_up" color="green-4" />
              </q-page-scroller>
            </q-layout>
          </q-scroll-area>
        </q-pull-to-refresh>
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: 'Pretendard-Regular';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/Pretendard-Regular.woff2') format('woff2'),
    url('./assets/fonts/Pretendard-Regular.woff') format('woff'),
    url('./assets/fonts/Pretendard-Regular.ttf') format('truetype');
}

body {
  overflow: hidden;
}

ul {
  padding: 5px;
  list-style-type: none;
}

#app {
  font-family: 'Pretendard-Regular', 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: $grey-3;
}

.max-width {
  max-width: 460px;
  min-width: 360px;
  margin: 0 auto;
  width: 100vw;
}

.without-header {
  height: calc(100vh - 51px);
}

.margin-top-header {
  top: 51px;
}

.image-48 {
  width: 48px;
  height: 48px;
  background: black;
  color: white;
  line-height: 48px;
  text-align: center;
}

.subpage {
  position: absolute;
  z-index: 3000;
}

.logo-img {
  height: 36px;
  max-width: 36px;
}

.q-pull-to-refresh__puller-container {
  left: 0 !important;
}

.q-item__section--side {
  padding-right: 8px !important;
}

.q-separator--horizontal:last-child {
  margin-bottom: 0 !important;
}
</style>
