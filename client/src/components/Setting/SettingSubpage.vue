<script setup lang="ts">
import { useRouter } from 'vue-router';

import { useSubpageStore } from '@/stores/subpage';
import SettingLayout from '@/layouts/SettingLayout.vue';
import GroupApi from '@/api/groupApi';
import SettingCard from './SettingCard.vue';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const subpageStore = useSubpageStore();
const { closeSettingMain, openStackMain, openPlatformMain } = subpageStore;

const router = useRouter();
// const routerPush = (path: string) => () => router.push(path);

const $q = useQuasar();

const SERVICE_CATEGORY = [
  { icon: 'flag', title: '우리의 미션', clickEvent: () => $q.notify({ type: 'info', message: '준비중입니다!' }) },
  {
    icon: 'description',
    title: '업데이트 노트',
    clickEvent: () => $q.notify({ type: 'info', message: '준비중입니다!' }),
  },
  { icon: 'rss_feed', title: '허용가능한 플랫폼', clickEvent: openPlatformMain },
  {
    icon: 'reviews',
    title: '의견 및 오류 제공',
    clickEvent: () => $q.notify({ type: 'info', message: '준비중입니다!' }),
  },
];
const ETC_CATEGORY = [{ icon: 'military_tech', title: '기술 스택', clickEvent: openStackMain }];

const groupCount = ref(0);
const linkCount = ref(0);
const postCount = ref(0);

onMounted(async () => {
  const { data } = await GroupApi.count();
  groupCount.value = data.value.groupCount;
  linkCount.value = data.value.linkCount;
  postCount.value = data.value.postCount;
});

function _closeSettingMain() {
  router.replace({ hash: '' });
  closeSettingMain();
}
</script>

<template>
  <SettingLayout title="더보기" @back="_closeSettingMain">
    <q-list padding class="rounded-borders">
      <q-item-label header>Total</q-item-label>
      <div class="row q-px-md q-mb-md">
        <div class="col-4">
          <q-chip class="count-chip" color="green-2" text-color="white"> {{ groupCount }} teams </q-chip>
        </div>
        <div class="col-4">
          <q-chip class="count-chip" color="green-3" text-color="white"> {{ linkCount }} blogs </q-chip>
        </div>
        <div class="col-4">
          <q-chip square class="count-chip" color="green-4" text-color="white"> {{ postCount }} posts</q-chip>
        </div>
      </div>
      <q-item-label header>Service</q-item-label>
      <div v-for="(v, i) in SERVICE_CATEGORY" :key="i">
        <SettingCard :setting-json="v" />
      </div>
      <q-separator spaced />
      <q-item-label header>Etc</q-item-label>
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
