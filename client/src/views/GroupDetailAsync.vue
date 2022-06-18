<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';
import RssAPI from '../api/rss';
import { ref } from 'vue';
import { Link, Post } from '../types/common';
import GroupDetailLinkCard from '../components/GroupDetailLinkCard.vue';
import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';
import { delay } from '../util';

const getPostsByLinks = async (links: Link[]): Promise<Post[]> => {
  return (await Promise.all(links.map(RssAPI.index))).flat().sort((x, y) => y.created - x.created);
};

const groupStore = useGroupStore();
const { selectGroup } = groupStore;
const { currentGroupData } = storeToRefs(groupStore);
const props = defineProps<{ id: number }>();
await selectGroup(props.id);
const { links } = currentGroupData.value;
const posts = await getPostsByLinks(links);
const tab = ref('urls');
await delay(2000);
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <GroupCard :group-data="currentGroupData" :detail="true" />
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="urls" :label="`urls (${links.length})`" />
            <q-tab name="posts" :label="`posts (${posts.length})`" />
            <q-tab name="stat" label="STAT" />
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
              <div class="text-h6">Movies</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
