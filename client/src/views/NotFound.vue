<script setup lang="ts">
import { getImage } from '@/util/ImageUtil';
import { useRouter } from 'vue-router';

const router = useRouter();
const logoPath = new URL('../assets/dark_logo.png', import.meta.url).toString();
const goMain = () => router.replace({ name: 'Group' });
</script>
<template>
  <div style="height: 100vh">
    <q-layout class="column items-center">
      <q-toolbar style="margin-top: 2rem; text-align: center">
        <q-toolbar-title class="logo original-name row justify-center items-center">
          <q-avatar rounded size="36px">
            <q-img :src="logoPath" no-spinner loading="eager" />
          </q-avatar>
          <span class="text-h5 q-px-sm" style="font-weight: bolder">teamlog</span>
        </q-toolbar-title>
      </q-toolbar>
      <q-avatar size="16rem" class="q-ma-md">
        <q-img :src="getImage('undraw_page_not_found.svg')" no-spinner loading="eager" />
      </q-avatar>
      <div class="text-h5" style="font-weight: bolder">요청하신 페이지를 찾을 수 없습니다.</div>
      <div>방문하시려는 페이지를 다시 한번 확인해주세요. 감사합니다.</div>
      <q-btn class="q-ma-md bg-green-4 text-white" @click="goMain()">메인으로 이동</q-btn>
    </q-layout>
  </div>
</template>

<style lang="scss"></style>
