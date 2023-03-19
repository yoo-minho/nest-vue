<script setup lang="ts">
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSubpageStore } from '@/stores/subpage';
import { useUserStore } from '@/stores/user';
import SettingLayout from '@/layouts/SettingLayout.vue';
import GroupApi from '@/api/groupApi';
import SettingCard from './SettingCard.vue';
import { onMounted, inject, ref } from 'vue';
import DarkModeCard from './DarkModeCard.vue';
import PlatformStatList from '../PlatformStatList.vue';
import { openFeedbackForm, openServiceIdentityNotion, openRequestTeamMakerForm } from '@/hooks/useOpenWindow';
import ApiArr from '@/data/login-api.json';
import UserApi from '@/api/userApi';
import { VueCookies } from 'vue-cookies';
import { QSpinnerIos, useQuasar } from 'quasar';
import { delay } from '@/util/CommUtil';

const $cookies = inject<VueCookies>('$cookies');
const subpageStore = useSubpageStore();
const { closeSettingMain, openStackMain, openPlatformMain } = subpageStore;

const userStore = useUserStore();
const { isExistsUser, profileImage, name, email } = storeToRefs(userStore);

const router = useRouter();
const $q = useQuasar();

const SERVICE_CATEGORY = [
  {
    icon: 'grade',
    title: '서비스 아이덴티티',
    clickEvent: () => openServiceIdentityNotion(),
  },
  {
    icon: 'rss_feed',
    title: '팀블로그 신청하기',
    clickEvent: () => openRequestTeamMakerForm(),
  },
  {
    icon: 'reviews',
    title: '의견,오류,제휴,광고 문의',
    clickEvent: () => openFeedbackForm(),
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

const tryLoginKakao = (e: MouseEvent) => {
  $q.loading.show({
    spinner: QSpinnerIos,
    spinnerColor: 'white',
    spinnerSize: 140,
    backgroundColor: 'dark',
    message: '잠시만 기다려주세요!',
    messageColor: 'white',
  });
  window.open('/api/auth/kakao', 'kakao');
  const iv = setInterval(async () => {
    if (!$cookies?.get('access-token')) return;
    $q.notify({ type: 'success', message: '로그인 성공' });
    await delay(500);
    $q.loading.hide();
    location.reload();
    clearInterval(iv);
  }, 1000);
  return e;
};

const logout = async () => {
  await UserApi.logoutUser();
  location.href = '/';
};
</script>

<template>
  <SettingLayout title="더보기" @back="_closeSettingMain">
    <q-list padding class="rounded-borders">
      <q-item-label header>계정</q-item-label>
      <div class="q-px-md q-mb-md">
        <template v-if="isExistsUser">
          <div class="row">
            <div style="width: 64px">
              <q-btn flat round dense>
                <q-avatar size="48px">
                  <img :src="profileImage" />
                </q-avatar>
              </q-btn>
            </div>
            <div class="col">
              <div style="font-size: 1rem">{{ name }}</div>
              <div>{{ email || 'nomail@kakao.com' }}</div>
            </div>
            <div style="width: 64px; text-align: center">
              <q-btn round icon="logout" @click="logout()"></q-btn>
            </div>
          </div>
        </template>
        <template v-else>
          <span>Start with</span>
          <div class="row">
            <div v-for="(api, i) in ApiArr" :key="i" class="button-wrap col-4" @click="tryLoginKakao">
              <div class="contents" :style="api.style">
                <img width="24" height="24" :src="api.src" :alt="api.alt" />
                <span class="label">{{ api.label }}</span>
              </div>
            </div>
          </div>
        </template>
      </div>
      <!-- <q-btn v-if="isExistsUser" flat round dense>
        <q-avatar size="24px">
          <img :src="profileImage" />
        </q-avatar>
      </q-btn> -->
      <q-separator spaced />

      <q-item-label header>전체 카운트 통계</q-item-label>
      <div class="row q-px-md q-mb-md">
        <div v-for="(v, i) in countArray" :key="i" class="col-4">
          <q-chip class="count-chip" :color="v.color" text-color="white">
            {{ v.value.toLocaleString() }} {{ v.label }}
          </q-chip>
        </div>
      </div>

      <q-separator spaced />

      <q-item-label header class="platform-area">
        전체 플랫폼 통계
        <q-chip size="12px" clickable @click="openPlatformMain()"> 허용가능한 플랫폼? </q-chip>
      </q-item-label>
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

.platform-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
}
</style>
<style lang="scss" scoped>
.button-wrap {
  .contents {
    cursor: pointer;
    display: flex;
    place-content: center;
    height: 36px;
    border-color: rgba(0, 0, 0, 0);
  }

  img {
    align-self: center;
  }

  .label {
    align-self: center;
    margin-left: 20px;
    font-size: 16px;
  }
}
</style>
