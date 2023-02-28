<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import SettingLayout from '@/layouts/SettingLayout.vue';
import GroupApi from '@/api/groupApi';
import SettingCard from './SettingCard.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import DarkModeCard from './DarkModeCard.vue';
import PlatformStatList from '../PlatformStatList.vue';

const subpageStore = useSubpageStore();
const { closeSettingMain, openStackMain, openPlatformMain } = subpageStore;

const router = useRouter();
const $q = useQuasar();

const SERVICE_CATEGORY = [
  {
    icon: 'description',
    title: '업데이트 노트',
    clickEvent: () => $q.notify({ type: 'info', message: '준비중입니다!' }),
  },
  { icon: 'rss_feed', title: '허용가능한 플랫폼', clickEvent: openPlatformMain },
  {
    icon: 'reviews',
    title: '의견 및 오류 제공',
    clickEvent: () => window.open('https://forms.gle/R4WQPKqJFmUg5p6v8', 'form'),
  },
];
const ETC_CATEGORY = [
  {
    icon: 'flag',
    title: '팀로그 탄생 비화',
    clickEvent: () => window.open('https://velog.io/@dellose/teamlog-birth', 'birth'),
  },
  { icon: 'military_tech', title: '팀로그의 기술 스택', clickEvent: openStackMain },
];
const countArray = ref();
const linkCountByPlatform = ref();

onMounted(async () => {
  const { data } = await GroupApi.count();
  const { groupCount, linkCount, postCount, linkCountByPlatform: linkCountBy } = data.value;
  countArray.value = [
    { label: 'teams', value: groupCount, color: 'green-2' },
    { label: 'blogs', value: linkCount, color: 'green-3' },
    { label: 'posts', value: postCount, color: 'green-4' },
  ];
  linkCountByPlatform.value = linkCountBy;
});

function _closeSettingMain() {
  router.replace({ hash: '' });
  closeSettingMain();
}
</script>

<template>
  <SettingLayout title="더보기" @back="_closeSettingMain">
    <q-list padding class="rounded-borders">
      <q-item-label header>전체 카운트 통계</q-item-label>
      <div class="row q-px-md q-mb-md">
        <div v-for="(v, i) in countArray" :key="i" class="col-4">
          <q-chip class="count-chip" :color="v.color" text-color="white">
            {{ v.value.toLocaleString() }} {{ v.label }}
          </q-chip>
        </div>
      </div>

      <q-separator spaced />

      <q-item-label header>전체 플랫폼 통계</q-item-label>
      <div class="row q-px-md q-mb-md">
        <PlatformStatList :link-count-by-platform="linkCountByPlatform" />
      </div>

      <q-separator spaced />

      <q-item-label header>서비스</q-item-label>

      <div v-for="(v, i) in SERVICE_CATEGORY" :key="i">
        <SettingCard :setting-json="v" />
      </div>

      <DarkModeCard />

      <q-separator spaced />

      <q-item-label header>기타</q-item-label>

      <div v-for="(v, i) in ETC_CATEGORY" :key="i">
        <SettingCard :setting-json="v" />
      </div>
    </q-list>
  </SettingLayout>
</template>

<style scope>
.count-chip {
  width: 100%;
  border-radius: 0;
}
</style>
