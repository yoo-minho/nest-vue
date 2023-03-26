<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import { useTagStore } from '@/stores/tag';
import TeamListItem from './components/TeamListItem.vue';
import { openFeedbackForm, openRequestTeamMakerForm } from '@/hooks/useOpenWindow';
import ScrollObserver from '@/components/Observer/ScrollObserver.vue';
import AdBanner from '@/components/AdBanner.vue';
import TeamListSkeletonItem from './components/TeamListSkeletonItem.vue';
import TeamTagList from './components/TeamTagList.vue';
import ScrollLayout from '@/layouts/ScrollLayout.vue';

const router = useRouter();
const route = useRoute();
const groupStore = useGroupStore();
const { fetchGroups } = groupStore;
const { groups, groupsLoading } = storeToRefs(groupStore);
const tagStore = useTagStore();
const { currentTag } = storeToRefs(tagStore);

const page = ref(1);

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
</script>

<template>
  <ScrollLayout>
    <router-view></router-view>
    <template v-if="route.name === 'Team'">
      <TeamTagList />
      <q-page class="q-mt-sm" style="min-height: 0">
        <template v-if="groupsLoading">
          <TeamListSkeletonItem v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <!-- <AdBanner
        v-if="isTotalTag"
        banner="안내"
        title="<회고> 글을 모아보고 싶다면 클릭!"
        contents="더 나은 내가 되기 위해, 더 나은 팀이 되기 위해, 더 나은 우리가 되기 위해"
        color="green-3"
        text-color="white"
        @click-banner="moveSpecialPage()"
      /> -->
          <TeamListItem v-for="group in groups.slice(0, 5)" :key="group.id" :group="group" />
          <!-- <AdBanner
        v-if="isTotalTag"
        banner="안내"
        title="<팀블로그> 만들어보고 싶다면 클릭!"
        contents="두 개 이상의 블로그 링크가 필요합니다!"
        color="green-3"
        text-color="white"
        @click-banner="openRequestTeamMakerForm()"
      /> -->
          <TeamListItem v-for="group in groups.slice(5, 10)" :key="group.id" :group="group" />
          <!-- <AdBanner
        v-if="isTotalTag"
        banner="문의"
        title="<의견,오류> 문의하고 싶다면 클릭!"
        contents="어떠한 문의든 대환영입니다!"
        color="green-4"
        text-color="white"
        @click-banner="openFeedbackForm()"
      /> -->
          <TeamListItem v-for="group in groups.slice(10, 15)" :key="group.id" :group="group" />
          <!-- <AdBanner
        v-if="isTotalTag"
        banner="광고"
        title="<광고,제휴> 문의하고 싶다면 클릭!"
        contents="첫 광고의 영광은 누구에게 갈까요?"
        color="yellow"
        text-color="black"
        @click-banner="openFeedbackForm()"
      /> -->
          <TeamListItem v-for="group in groups.slice(15)" :key="group.id" :group="group" />
          <ScrollObserver @trigger-intersected="loadMore">
            <TeamListSkeletonItem />
          </ScrollObserver>
        </template>
      </q-page>
    </template>
  </ScrollLayout>
</template>
