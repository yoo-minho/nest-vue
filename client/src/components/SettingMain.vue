<script setup lang="ts">
import HeaderItem from './HeaderItem.vue';
import SettingCard from './SettingCard.vue';
import { useRouter } from 'vue-router';

import { useSubpageStore } from '../stores/subpage';

const subpageStore = useSubpageStore();
const { closeSettingMain, openStackMain } = subpageStore;

const router = useRouter();

const routerPush = (path: string) => () => {
  router.push(path);
};

const SERVICE_CATEGORY = [
  { icon: 'flag', title: '우리의 미션', clickEvent: () => routerPush('/') },
  { icon: 'rss_feed', title: '허용가능한 플랫폼', clickEvent: routerPush('/') },
  { icon: 'groups', title: '그룹 신청하기', clickEvent: routerPush('/') },
  { icon: 'reviews', title: '의견 및 오류 제공', clickEvent: routerPush('/') },
];

const ETC_CATEGORY = [{ icon: 'military_tech', title: '기술 스택', clickEvent: openStackMain }];
</script>

<template>
  <q-layout class="subpage max-width">
    <HeaderItem :back="closeSettingMain" :title="'더 보기'" />
    <q-page-container class="max-width">
      <q-list padding class="rounded-borders">
        <q-item-label header>서비스</q-item-label>
        <div v-for="(v, i) in SERVICE_CATEGORY" :key="i">
          <SettingCard :setting-json="v"></SettingCard>
        </div>

        <q-separator spaced />

        <q-item-label header>기타</q-item-label>
        <div v-for="(v, i) in ETC_CATEGORY" :key="i">
          <SettingCard :setting-json="v"></SettingCard>
        </div>
      </q-list>
    </q-page-container>
  </q-layout>
</template>

<style></style>
