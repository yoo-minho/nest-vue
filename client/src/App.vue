<template>
  <div class="max-width bg-white">
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
  src: url('./assets/fonts/Pretendard-Regular.woff2') format('woff2');
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
  background-color: white;
}
</style>
