<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import { useGroupStore } from '../stores/group';
import { storeToRefs } from 'pinia';

const groupStore = useGroupStore();
const { selectGroup } = groupStore;
const { currentGroupData } = storeToRefs(groupStore);

const props = defineProps<{ id: number }>();
await selectGroup(props.id);
</script>

<template>
  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <GroupCard :group-data="currentGroupData" :detail="true" />

        <q-item>
          <q-item-section>
            <q-item-label caption>Posts</q-item-label>
            <q-item-label class="q-gutter-x-sm row">
              <div v-for="(link, i) in 10" :key="i">글을 쓰자.</div>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
