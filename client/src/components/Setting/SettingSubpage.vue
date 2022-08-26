<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useSubpageStore } from '@/stores/subpage';
import SettingLayout from '@/layouts/SettingLayout.vue';
import SettingCard from './SettingCard.vue';

const subpageStore = useSubpageStore();
const { closeSettingMain, openStackMain, openPlatformMain } = subpageStore;

const router = useRouter();
const routerPush = (path: string) => () => router.push(path);

const SERVICE_CATEGORY = [
  { icon: 'flag', title: '우리의 미션', clickEvent: () => routerPush('/') },
  { icon: 'description', title: '업데이트 노트', clickEvent: () => routerPush('/') },
  { icon: 'rss_feed', title: '허용가능한 플랫폼', clickEvent: openPlatformMain },
  { icon: 'reviews', title: '의견 및 오류 제공', clickEvent: routerPush('/') },
];
const ETC_CATEGORY = [{ icon: 'military_tech', title: '기술 스택', clickEvent: openStackMain }];
</script>

<template>
  <SettingLayout title="더보기" @back="closeSettingMain">
    <q-list padding class="rounded-borders">
      <q-item-label header>서비스</q-item-label>
      <div v-for="(v, i) in SERVICE_CATEGORY" :key="i">
        <SettingCard :setting-json="v" />
      </div>
      <q-separator spaced />
      <q-item-label header>기타</q-item-label>
      <div v-for="(v, i) in ETC_CATEGORY" :key="i">
        <SettingCard :setting-json="v" />
      </div>
    </q-list>
  </SettingLayout>
</template>

<style></style>