<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import LinkList from '../components/LinkList.vue';

import { useGroupStore } from '../stores/group';
import { useGroupTagStore } from '../stores/groupTag';
import { onMounted, watch } from 'vue';

const groupStore = useGroupStore();
const groupTagStore = useGroupTagStore();
const { getAll: getAllGroups, getByTag } = groupStore;
const { groups } = storeToRefs(groupStore);
const { getAll: getAllTags, setCurrentTag } = groupTagStore;
const { countGroupByTag, currentTag, isTotalTag } = storeToRefs(groupTagStore);
const router = useRouter();

onMounted(() => {
  getAllTags();
  getAllGroups();
});

watch(
  () => currentTag.value,
  (tag) => {
    if (isTotalTag.value) {
      getAllGroups();
    } else {
      getByTag(tag);
    }
  },
);

const clickGroup = (id: string) => router.push({ path: `/@${id}` });
</script>

<template>
  <q-layout>
    <HeaderItem :logo="true" :editor="true" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <q-scroll-area class="q-px-md q-pt-md" style="height: 50px; max-width: 900px" :thumb-style="{ opacity: '0' }">
          <div class="row no-wrap">
            <q-chip
              v-for="(v, i) in countGroupByTag"
              :key="i"
              :class="{ active: currentTag === v.tag }"
              clickable
              @click="setCurrentTag(v.tag)"
              >{{ v.tag }}
            </q-chip>
          </div>
        </q-scroll-area>
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

<style scope>
.active {
  color: white;
  background-color: black;
  font-weight: bolder;
}
</style>
