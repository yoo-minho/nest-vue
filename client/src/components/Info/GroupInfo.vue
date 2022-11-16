<script setup lang="ts">
import { toRefs } from 'vue';
import { Group } from '@/types/common';
import { getFormatString, isWithinAWeek } from '@/plugin/dayjs';
import { storeToRefs } from 'pinia';
import { usePostStore } from '@/stores/post';

const props = defineProps<{ mode: 'HEADER' | 'LIST-ITEM'; groupData: Group }>();
const isHeader = props.mode === 'HEADER';

const postStore = usePostStore();
const { scrapLoading } = storeToRefs(postStore);

const { title, description, domain, lastPostCreatedAt } = toRefs(props.groupData);
</script>

<template>
  <q-item class="q-pt-md">
    <q-item-section :class="{ 'text-center': isHeader }">
      <q-item-label class="text-weight-bold text-green-4">
        @{{ domain }}
        <!-- <q-badge v-if="isWithinAWeek(lastPostCreatedAt)" color="red" class="q-pt-sm"> UP </q-badge> -->
      </q-item-label>
      <q-item-label class="justify-between items-center" :class="{ row: !isHeader }">
        <div class="text-h6 text-weight-bolder">{{ title }}</div>
        <div v-if="!isHeader" class="text-grey-5">
          {{ getFormatString(lastPostCreatedAt, 'YYYY-MM-DD') }}
        </div>
      </q-item-label>
      <q-item-label>
        {{ description }}
        <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
      </q-item-label>
      <div v-if="isHeader" class="q-my-sm">
        <q-item-label v-if="scrapLoading">
          <q-linear-progress dark rounded indeterminate color="green-4" class="q-mt-sm" />
          <q-linear-progress dark rounded query color="green-2" class="q-mt-sm" />
        </q-item-label>
        <q-item-label v-else>
          <div class="text-grey-5">
            {{ getFormatString(lastPostCreatedAt, 'YYYY-MM-DD HH:mm (ddd)') }}
          </div>
        </q-item-label>
      </div>
    </q-item-section>
  </q-item>
</template>
