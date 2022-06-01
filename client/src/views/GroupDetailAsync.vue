<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import LinkCard from '../components/LinkCard.vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';
import RssAPI from '../api/rss';
import { Link, RssItem } from '../types/common';

const groupStore = useGroupStore();
const { selectGroup } = groupStore;
const { currentGroupData } = storeToRefs(groupStore);

const props = defineProps<{ id: number }>();
await selectGroup(props.id);
const posts = await getPosts();

async function getPosts() {
  const _links = currentGroupData.value.links;
  const results = await Promise.all(_links.map((link) => RssAPI.index(link.url)));
  const items = results.map((res, idx) =>
    res.items.map((item: RssItem) => {
      const _link: Link = _links[idx];
      const createdStr = new Date(item.created).toLocaleDateString();
      return { ...item, link: _link, createdStr };
    }),
  );
  return items.flat().sort((x, y) => y.created - x.created);
}
</script>

<template>
  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <GroupCard :group-data="currentGroupData" :detail="true" />
        <q-item>
          <q-item-section>
            <q-item-label caption>Posts</q-item-label>

            <div v-for="(post, i) in posts" :key="i" style="position: relative">
              <q-separator spaced />
              <q-item style="padding: 0; min-height: 0">
                <q-item-section>
                  <q-item-label>{{ post.title }}</q-item-label>
                  <q-item-label caption class="ellipsis-2-lines">{{ post.description }}</q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <LinkCard :link-data="post.link"></LinkCard>
                </q-item-section>
              </q-item>

              <!-- <q-item>
                  <q-item-section>
                    <q-item-label>
                      <q-item style="padding: 0; min-height: 0">
                        <q-item-section class="text-weight-bolder">{{ post.title }}</q-item-section>
                      </q-item>
                    </q-item-label>
                    <q-item-label caption>
                      <span class="ellipsis-2-lines">
                        {{ post.description }}
                        <q-tooltip max-width="20rem">내용...</q-tooltip>
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <LinkCard :link-data="post.link"></LinkCard> -->
            </div>
          </q-item-section>
        </q-item>
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
