<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useGroupStore } from '@/stores/group';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupCard from './components/GroupCard.vue';
import GroupTagList from './components/GroupTagList.vue';
import { delay } from '@/util/CommUtil';
import GroupAdBanner from './components/GroupAdBanner.vue';
import { openFeedbackForm, openRequestTeamMakerForm } from '@/hooks/useOpenWindow';

const router = useRouter();
const groupStore = useGroupStore();
const { fetchAllGroup, fetchByTag, fetchAllTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag } = storeToRefs(groupStore);

onMounted(() => {
  fetchAllTag();
});

const tagValue = ref('');

const fetchData = async (tag: string) => {
  if (isTotalTag.value) {
    await fetchAllGroup();
  } else {
    tagValue.value = tag;
    await fetchByTag(tag);
  }
};

watch(
  () => currentTag.value,
  (tag) => {
    groupsLoading.value = true;
    fetchData(tag);
  },
  { immediate: true },
);

const refresh = async (done: () => void) => {
  await delay(1000);
  await fetchData(tagValue.value);
  done();
};

const moveSpecialPage = () => {
  router.push({ name: 'GroupSearch', query: { keyword: '회고' } });
};
</script>

<template>
  <DefaultLayout>
    <q-pull-to-refresh @refresh="refresh">
      <GroupTagList />
      <q-separator class="q-mb-sm" />
      <q-page>
        <template v-if="groupsLoading">
          <GroupMainLoader />
        </template>
        <template v-else>
          <GroupAdBanner
            v-if="isTotalTag"
            banner="안내"
            title="<회고> 글을 모아보고 싶다면 클릭!"
            contents="더 나은 내가 되기 위해, 더 나은 팀이 되기 위해, 더 나은 우리가 되기 위해"
            color="green-3"
            text-color="white"
            @click-banner="moveSpecialPage()"
          />
          <GroupCard v-for="group in groups.slice(0, 5)" :key="group.id" :group="group" />
          <GroupAdBanner
            v-if="isTotalTag"
            banner="안내"
            title="<팀블로그> 만들어보고 싶다면 클릭!"
            contents="두 개 이상의 블로그 링크가 필요합니다!"
            color="green-3"
            text-color="white"
            @click-banner="openRequestTeamMakerForm()"
          />
          <GroupCard v-for="group in groups.slice(5, 10)" :key="group.id" :group="group" />
          <GroupAdBanner
            v-if="isTotalTag"
            banner="문의"
            title="<의견,오류> 문의하고 싶다면 클릭!"
            contents="어떠한 문의든 대환영입니다!"
            color="green-4"
            text-color="white"
            @click-banner="openFeedbackForm()"
          />
          <GroupCard v-for="group in groups.slice(10, 15)" :key="group.id" :group="group" />
          <GroupAdBanner
            v-if="isTotalTag"
            banner="광고"
            title="<광고,제휴> 문의하고 싶다면 클릭!"
            contents="첫 광고의 영광은 누구에게 갈까요?"
            color="yellow"
            text-color="black"
            @click-banner="openFeedbackForm()"
          />
          <GroupCard v-for="group in groups.slice(15)" :key="group.id" :group="group" />
        </template>
      </q-page>
    </q-pull-to-refresh>
  </DefaultLayout>
</template>
