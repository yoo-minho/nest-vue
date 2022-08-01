<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';

import RssAPI from '../api/rssApi';
import PostAPI from '../api/postApi';
import { useGroupStore } from '../stores/group';
import { ref } from 'vue';
import { delay } from '../util';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const { getGroupData } = useGroupStore();
const props = defineProps<{ domain: string }>();
const currentGroupData = await getGroupData(props.domain);

const { links = [], totalViews, dailyViews } = currentGroupData;

await Promise.all(links.map(({ link }) => RssAPI.scrap(link)));
const rssResult = await Promise.all(links.map(({ link }) => PostAPI.findAllPosts(link.id || 0)));
//const posts = rssResult.flat().sort((x, y) => y.createdAt - x.createdAt);

const linksBundle = links.map(({ link }) => ({ linkId: link.id || 0 }));
const posts = await PostAPI.findAllPosts2(linksBundle);

const route = useRoute();
const selectTab = ref();
selectTab.value = route.name;

const tabArr = [
  { name: 'Link', label: `플랫폼 (${links.length})` },
  { name: 'Post', label: `포스트 (${posts.length})` },
  { name: 'Stat', label: `통계` },
];

await delay(1000);
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <div class="q-pt-md q-px-md row justify-between">
            <q-badge color="primary" :label="'today : ' + dailyViews" />
            <q-badge color="green-4" :label="'total : ' + totalViews" />
          </div>
          <GroupCard mode="HEADER" :group-data="currentGroupData" />
          <q-tabs
            v-model="selectTab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab
              v-for="(tab, idx) in tabArr"
              :key="idx"
              :name="`GroupDetail${tab.name}`"
              :label="tab.label"
              @click="router.push({ name: `GroupDetail${tab.name}` })"
            />
          </q-tabs>
          <q-separator />
          <router-view :links="links" :posts="posts" :rss-result="rssResult" />
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
