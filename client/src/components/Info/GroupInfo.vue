<script setup lang="ts">
import { Group } from '@/types/common';
import { getFormatString } from '@/plugin/dayjs';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

const props = defineProps<{ mode: 'HEADER' | 'LIST-ITEM'; groupData: Group }>();
const isHeader = props.mode === 'HEADER';
const postStore = usePostStore();
const { scrapLoading } = storeToRefs(postStore);
</script>

<template>
  <q-item class="column q-pt-md q-pb-sm">
    <q-item-section :class="{ 'text-center': isHeader }">
      <q-item-label class="text-weight-bold text-green-4"> @{{ groupData.domain }} </q-item-label>
      <q-item-label class="justify-between items-center" :class="{ row: !isHeader }">
        <div class="text-h6 text-weight-bolder">{{ groupData.title }}</div>
        <div v-if="!isHeader" class="text-grey-5">
          {{ getFormatString(groupData.lastPostCreatedAt, 'YYYY-MM-DD') }}
        </div>
      </q-item-label>
      <q-item-label>
        <div style="white-space: pre-wrap">{{ groupData.description }}</div>
        <q-tooltip max-width="20rem">{{ groupData.description }}</q-tooltip>
      </q-item-label>

      <template v-if="isHeader">
        <template v-if="scrapLoading">
          <q-linear-progress dark rounded indeterminate color="green-4" class="q-mt-sm" />
          <q-linear-progress dark rounded query color="green-2" class="q-mt-sm" />
        </template>

        <template v-else>
          <div class="q-mt-sm">
            <q-item-label class="text-grey-5">
              {{ getFormatString(groupData.lastPostCreatedAt, 'YYYY-MM-DD HH:mm (ddd)') }}
            </q-item-label>
          </div>
        </template>
      </template>
    </q-item-section>
  </q-item>
</template>
