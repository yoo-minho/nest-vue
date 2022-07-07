<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import LinkList from '../components/LinkList.vue';

import { useGroupStore } from '../stores/group';
import { useGroupTagStore } from '../stores/groupTag';
import { onMounted } from 'vue';

const groupStore = useGroupStore();
const groupTagStore = useGroupTagStore();
const { init: initGroups } = groupStore;
const { groupDataList } = storeToRefs(groupStore);
const { init: initTags } = groupTagStore;
const { tags } = storeToRefs(groupTagStore);
const router = useRouter();

onMounted(() => {
  initTags();
  initGroups();
});

function clickGroup(id: string): void {
  router.push({ path: `/@${id}` });
}
</script>

<template>
  <q-layout>
    <HeaderItem :logo="true" :editor="true" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        {{ tags }}
        <q-page class="q-pa-md">
          <p v-for="groupData in groupDataList" :key="groupData.index">
            <q-card>
              <q-card-section style="padding: 0">
                <GroupCard :group-data="groupData" class="cursor-pointer" @click="clickGroup(groupData.id)" />
                <LinkList :links="groupData.links" />
              </q-card-section>
            </q-card>
          </p>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
