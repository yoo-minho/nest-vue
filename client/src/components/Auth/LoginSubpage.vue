<script setup lang="ts">
import AuthLayout from '@/layouts/AuthLayout.vue';
import { useSubpageStore } from '@/stores/subpage';
import ApiArr from '@/data/login-api.json';

const subpageStore = useSubpageStore();
const { closeLoginSubpage } = subpageStore;

const url = new URL(`../../assets/logo.png`, import.meta.url).toString();

const loginKakao = () => {
  Kakao.Auth.authorize({
    redirectUri: '/oauth',
  });
};
</script>
<template>
  <AuthLayout title="로그인" @close="closeLoginSubpage()">
    <q-page class="q-pa-lg">
      <ul class="q-ma-none">
        <li v-for="(api, i) in ApiArr" :key="i" class="button-wrap" @click="loginKakao()">
          <div class="contents" :style="api.style">
            <img width="24" height="24" :src="api.src" :alt="api.alt" />
            <span class="label">{{ api.label }}</span>
          </div>
        </li>
      </ul>
      <div class="text-h6 q-mb-lg text-center">
        <div>간편하게 로그인하고</div>
        <div>자유롭게 활용하세요</div>
      </div>
      <div class="d-flex text-center">
        <span class="q-mx-sm">Service by Teamlog</span>
        <q-img :src="url" spinner-color="white" class="bottom-logo" />
      </div>
    </q-page>
  </AuthLayout>
</template>
<style lang="scss" scoped>
.button-wrap {
  margin-bottom: 20px;

  .contents {
    cursor: pointer;
    display: flex;
    place-content: center;
    height: 56px;
    border-radius: 10px;
  }

  img {
    align-self: center;
  }

  .label {
    align-self: center;
    margin-left: 20px;
    font-size: 1rem;
  }
}

.bottom-logo {
  height: 36px;
  max-width: 36px;
}
</style>
