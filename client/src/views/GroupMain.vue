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
const { getAll: getAllGroups } = groupStore;
const { groups } = storeToRefs(groupStore);
const { getAll: getAllTags } = groupTagStore;
const { countGroupByTag } = storeToRefs(groupTagStore);
const router = useRouter();

onMounted(() => {
  getAllTags();
  getAllGroups();
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
        <div class="row q-px-md q-pt-md">
          <q-chip v-for="(v, i) in countGroupByTag" :key="i" dense>{{ v.tag }}</q-chip>
        </div>
        <q-page class="q-pa-md">
          <p v-for="groupData in groups" :key="groupData.index">
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
