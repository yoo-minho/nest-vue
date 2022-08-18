<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import LinkList from '../components/LinkList.vue';
import { useGroupStore } from '../stores/group';
import { onMounted, watch } from 'vue';

const groupStore = useGroupStore();
const { loadAllGroup, getByTag, loadAllTag, setCurrentTag } = groupStore;
const { groups, groupsLoading, NavTags, currentTag, isTotalTag, tagsLoading } = storeToRefs(groupStore);
const router = useRouter();

onMounted(() => {
  loadAllTag();
  loadAllGroup();
});

watch(
  () => currentTag.value,
  (tag) => {
    console.log({ tag, isTotalTag: isTotalTag.value });
    groupsLoading.value = true;
    if (isTotalTag.value) {
      loadAllGroup();
    } else {
      getByTag(tag);
    }
    console.log(groups.value);
  },
);

const clickGroup = (domain: string) => router.push({ path: `/@${domain}` });
</script>

<template>
  <q-layout>
    <HeaderItem :logo="true" :editor="true" :setting="true" />
    <q-page-container class="max-width">
      <q-scroll-area :visible="false" class="max-width without-header">
        <q-scroll-area class="q-px-md q-pt-md" style="height: 50px; max-width: 900px" :thumb-style="{ opacity: '0' }">
          <div class="row no-wrap">
            <template v-if="tagsLoading">
              <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
            </template>
            <template v-else>
              <q-chip
                v-for="(tag, i) in NavTags"
                :key="i"
                :class="{ active: currentTag === tag.name }"
                clickable
                @click="setCurrentTag(tag.name)"
                >{{ tag.name }}
              </q-chip>
            </template>
          </div>
        </q-scroll-area>
        <q-page class="q-pa-md">
          <template v-if="groupsLoading">
            <q-skeleton v-for="n in 1" :key="n" :type="'QChip'" class="q-ma-xs" />
          </template>
          <template v-else>
            <p v-for="groupData in groups" :key="groupData.id">
              <q-card class="cursor-pointer" @click="clickGroup(groupData.domain)">
                <q-card-section class="q-pa-none">
                  <GroupCard mode="LIST-ITEM" :group-data="groupData" />
                  <LinkList :links="groupData.links || []" />
                </q-card-section>
              </q-card>
            </p>
          </template>
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
