<script setup lang="ts">
import CommonSubpage from './components/CommonSubpage.vue';
</script>

<template>
  <div class="max-width">
    <CommonSubpage />
    <router-view />
  </div>
</template>

<style>
body {
  overflow: hidden;
}

ul {
  padding: 5px;
  list-style-type: none;
}

#app {
  font-family: 'Noto Sans KR', Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}

.max-width {
  max-width: 460px;
  min-width: 375px;
  margin: 0 auto;
}

.container-without-header-n-footer {
  height: calc(100vh - 51px);
}
</style>
