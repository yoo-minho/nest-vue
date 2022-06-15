<script setup lang="ts">
import SettingCard from '../components/SettingCard.vue';
import {ref} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const routerPush = (path) => () => router.push(path);

const SERVICE_CATEGORY = [
  {icon: 'flag', title: '우리의 미션', clickEvent: () => isOpenView.value = true},
  {icon: 'rss_feed', title: '허용가능한 플랫폼', clickEvent: routerPush('/')},
  {icon: 'groups', title: '그룹 신청하기', clickEvent: routerPush('/')},
  {icon: 'reviews', title: '의견 및 오류 제공', clickEvent: routerPush('/')},
];

const ETC_CATEGORY = [{icon: 'military_tech', title: '기술 스택', clickEvent: () => router.push('stack')}];

const isOpenView = ref(false);
</script>

<template>
  <div>
      <transition-group appear enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">

        <q-page-container v-if="isOpenView" class="max-width">
          <div class="q-pa-sm">
            <div class="text-h1">그렇군요</div>
            <div class="text-h2">그렇군요</div>
            <div class="text-h3">그렇군요</div>
            <div class="text-h4">그렇군요</div>
            <div class="text-h5">그렇군요</div>
            <div class="text-h6">그렇군요</div>
          </div>
        </q-page-container>
      </transition-group>

      <q-page-container v-if="!isOpenView" class="max-width">
        <q-list padding class="rounded-borders">
          <q-item-label header>서비스</q-item-label>
          <div v-for="(v, i) in SERVICE_CATEGORY" :key="i">
              <SettingCard :setting-json="v"></SettingCard>
            </div>

          <q-separator spaced/>

          <q-item-label header>기타</q-item-label>
          <div v-for="(v, i) in ETC_CATEGORY" :key="i">
              <SettingCard :setting-json="v"></SettingCard>
            </div>
        </q-list>
      </q-page-container>
    </div>
</template>

<style></style>
