<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import LinkCard from '../components/LinkCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';
import RssAPI from '../api/rss';

const groupStore = useGroupStore();
const { selectGroup } = groupStore;
const { currentGroupData } = storeToRefs(groupStore);

const props = defineProps<{ id: number }>();
await selectGroup(props.id);
const posts = await getPosts();

async function getPosts() {
  const _links = currentGroupData.value.links;
  const results = await Promise.all(_links.map((link) => RssAPI.index(link)));
  return results.flat().sort((x, y) => y.created - x.created);
}

function openUrl(url: string) {
  window.open(url);
}
</script>

<template>
  <q-layout>
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
        <q-page class="max-width">
          <GroupCard :group-data="currentGroupData" :detail="true" />
          <q-item>
            <q-item-section>
              <q-item-label caption>Posts</q-item-label>

              <q-item-label
                v-for="(post, i) in posts"
                :key="i"
                style="position: relative"
                class="cursor-pointer"
                @click="openUrl(post.link)"
              >
                <q-separator spaced />
                <q-item style="" class="row">
                  <q-item-section class="col-10">
                    <q-item-label class="text-weight-bold ellipsis">{{ post.title }}</q-item-label>
                    <q-item-label class="ellipsis-2-lines">{{ post.description }}</q-item-label>
                    <q-item-label caption>{{ post.createdStr }}</q-item-label>
                  </q-item-section>

                  <q-item-section class="col-2">
                    <LinkCard :link-data="post.linkInfo" :posts="true"></LinkCard>
                  </q-item-section>
                </q-item>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
