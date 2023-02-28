<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, watch, onMounted } from 'vue';
import { showBottomSheet } from '@/hooks/useInstallBottomSheeet';

const $q = useQuasar();
const isDarkActive = ref($q.dark.isActive);

watch(
  () => $q.dark.isActive,
  (val) => (isDarkActive.value = val),
);

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    showBottomSheet(e as BeforeInstallPromptEvent);
  });
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
  });
});
</script>

<template>
  <div :class="`max-width ${isDarkActive ? 'bg-grey-9' : 'bg-white'}`">
    <div id="subpage"></div>
    <router-view v-slot="{ Component, route }">
      <transition :name="String(route.meta.transitionName)">
        <keep-alive include="GroupMain">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
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

.q-pull-to-refresh__puller-container {
  left: 0 !important;
}

.logo-img {
  height: 36px;
  max-width: 36px;
}
</style>
