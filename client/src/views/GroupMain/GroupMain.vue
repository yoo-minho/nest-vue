<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

import { useGroupStore } from '@/stores/group';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import GroupMainLoader from '@/components/Loader/GroupMainLoader.vue';
import GroupMainEmpty from '@/components/Empty/GroupMainEmpty.vue';
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
      <q-page class="q-pt-sm q-pb-md q-px-md">
        <template v-if="groupsLoading">
          <GroupMainLoader />
        </template>
        <template v-if="groups.length === 0">
          <GroupMainEmpty />
        </template>
        <template v-else>
          <GroupAdBanner
            v-if="isTotalTag"
            icon="campaign"
            contents="<회고> 모아보고 싶다면 Click!"
            @click-banner="moveSpecialPage()"
          />
          <GroupCard v-for="group in groups.slice(0, 5)" :key="group.id" :group="group" />
          <GroupAdBanner
            v-if="isTotalTag"
            icon="workspaces_outline"
            contents="<팀블로그> 만들고 싶다면 Click!"
            @click-banner="openRequestTeamMakerForm()"
          />
          <GroupCard v-for="group in groups.slice(5, 10)" :key="group.id" :group="group" />
          <GroupAdBanner
            v-if="isTotalTag"
            icon="reviews"
            contents="<의견,오류,제휴> 문의하고 싶다면 Click!"
            @click-banner="openFeedbackForm()"
          />
          <GroupCard v-for="group in groups.slice(10)" :key="group.id" :group="group" />
        </template>
      </q-page>
    </q-pull-to-refresh>
  </DefaultLayout>
</template>

<style lang="scss">
@import './styles/_group-main.scss';
</style>
