<!-- <script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { delay } from '@/util/CommUtil';

import { useGroupStore } from '@/stores/group';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupCard from './components/GroupCard.vue';
import GroupTagList from './components/GroupTagList.vue';
import GroupAdBanner from './components/GroupAdBanner.vue';
import { openFeedbackForm, openRequestTeamMakerForm } from '@/hooks/useOpenWindow';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';

const router = useRouter();
const route = useRoute();
const groupStore = useGroupStore();
const { fetchGroups, fetchAllTag, setCurrentTag } = groupStore;
const { groups, groupsLoading, currentTag, isTotalTag } = storeToRefs(groupStore);
const page = ref(1);

onMounted(() => {
  setCurrentTag(String(route.query.tag || ''));
  fetchAllTag();
});

const loadMore = async (el: Element) => {
  const existsPosts = await fetchGroups(page.value);
  if (existsPosts) {
    page.value++;
  } else {
    el.innerHTML = '';
  }
};

watch(
  () => currentTag.value,
  () => {
    groupsLoading.value = true;
    page.value = 1;
    fetchGroups();
    page.value++;
  },
  { immediate: true },
);

const refresh = async (done: () => void) => {
  page.value = 1;
  await Promise.all([delay(1000), fetchGroups()]);
  page.value++;
  done();
};

const moveSpecialPage = () => {
  router.push({ name: 'GroupSearch', query: { keyword: '회고' } });
};
</script>

<template>
  <q-page>
    <template v-if="groupsLoading">
      <GroupMainLoader v-for="i in 10" :key="i" />
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
      <ScrollObserver @trigger-intersected="loadMore">
        <GroupMainLoader />
      </ScrollObserver>
    </template>
  </q-page>
</template> -->
