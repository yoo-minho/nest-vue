<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import GroupDetailLinkCard from '../components/GroupDetailLinkCard.vue';
import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';
import GroupDetailStat from '../components/GroupDetailStat.vue';

import RssAPI from '../api/rssApi';
import { useGroupStore } from '../stores/group';
import { ref } from 'vue';
import { delay } from '../util';

const tab = ref('urls');
const { getGroupData } = useGroupStore();
const props = defineProps<{ id: string }>();
const currentGroupData = await getGroupData(props.id);
const { links, today, total } = currentGroupData;
const rssResult = await Promise.all(links.map(RssAPI.index));
const posts = rssResult.flat().sort((x, y) => y.created - x.created);

await delay(500);
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <div class="q-pt-md q-px-md row justify-between">
            <q-badge color="primary" :label="'today : ' + today" />
            <q-badge color="green-4" :label="'total : ' + total" />
          </div>
          <GroupCard mode="HEADER" :group-data="currentGroupData" :detail="true" />
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="urls" :label="`플랫폼 (${links.length})`" />
            <q-tab name="posts" :label="`포스트 (${posts.length})`" />
            <q-tab name="stat" label="통계" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="urls">
              <q-item style="padding: 0; min-height: 0">
                <q-item-section>
                  <GroupDetailLinkCard v-for="(link, i) in links" :key="i" :link="link" />
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="posts">
              <q-item style="padding: 0; min-height: 0">
                <q-item-section>
                  <GroupDetailPostCard v-for="(post, i) in posts" :key="i" :post="post" />
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="stat">
              <GroupDetailStat :links="links" :rss-result="rssResult" />
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
