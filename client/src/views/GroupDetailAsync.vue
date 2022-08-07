<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import GroupDetailCounter from '../components/GroupDetailCounter.vue';
import GroupDetailTab from '../components/GroupDetailTab.vue';

import RssAPI from '../api/rssApi';
import PostAPI from '../api/postApi';
import { useGroupStore } from '../stores/group';
import { ref } from 'vue';
import { delay } from '../util';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectTab = ref();
selectTab.value = route.name;

const { getGroupData } = useGroupStore();
const props = defineProps<{ domain: string }>();

const currentGroupData = await getGroupData(props.domain);
const { links = [], totalViews = 0, dailyViews = 0 } = currentGroupData;
await Promise.all(links.map(({ link }) => RssAPI.scrap(link)));
const posts = await PostAPI.findAllPosts(links);

await delay(1000);
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <GroupDetailCounter :daily-views="dailyViews" :total-views="totalViews" />
          <GroupCard mode="HEADER" :group-data="currentGroupData" />
          <GroupDetailTab :link-count="links.length" :post-count="posts.length" />
          <q-separator />
          <router-view :links="links" :posts="posts" />
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
