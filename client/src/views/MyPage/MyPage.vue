<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';

import LoginPage from './components/LoginPage.vue';
import MyInnerPage from './components/MyInnerPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
const userStore = useUserStore();
const { userLoading, isExistsUser, profileImage, name, email } = storeToRefs(userStore);
</script>

<template>
  <MainLayout>
    <q-page class="q-mt-sm">
      <template v-if="userLoading"></template>
      <template v-else-if="isExistsUser">
        <MyInnerPage :name="name" :email="email" :profile-image="profileImage" />
      </template>
      <template v-else>
        <LoginPage />
      </template>
    </q-page>
  </MainLayout>
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
</style>
