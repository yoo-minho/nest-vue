<script setup lang="ts">
import SettingCard from '../components/SettingCard.vue';

const SERVICE_CATEGORY = [
  { icon: 'flag', title: '우리의 미션', pushUrl: '/' },
  { icon: 'rss_feed', title: '허용가능한 플랫폼', pushUrl: '/' },
  { icon: 'groups', title: '그룹 신청하기', pushUrl: '/' },
  { icon: 'reviews', title: '의견 및 오류 제공', pushUrl: '/' },
];

const ETC_CATEGORY = [{ icon: 'military_tech', title: '기술 스택', pushUrl: '/stack' }];
</script>

<template>
  <q-page-container class="max-width">
    <div>
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
    </div>
  </q-page-container>
</template>

<style></style>
