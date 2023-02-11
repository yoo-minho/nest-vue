<script setup lang="ts">
import { Group } from '@/types/common';
import { getFormatString } from '@/plugin/dayjs';

const props = defineProps<{ mode: 'HEADER' | 'LIST-ITEM'; groupData: Group }>();
const isHeader = props.mode === 'HEADER';
</script>

<template>
  <q-item class="q-pt-md">
    <q-item-section :class="{ 'text-center': isHeader }">
      <q-item-label class="text-weight-bold text-green-4"> @{{ groupData.domain }} </q-item-label>
      <q-item-label class="justify-between items-center" :class="{ row: !isHeader }">
        <div class="text-h6 text-weight-bolder">{{ groupData.title }}</div>
        <div v-if="!isHeader" class="text-grey-5">
          {{ getFormatString(groupData.lastPostCreatedAt, 'YYYY-MM-DD') }}
        </div>
      </q-item-label>
      <q-item-label>
        {{ groupData.description }}
        <q-tooltip max-width="20rem">{{ groupData.description }}</q-tooltip>
      </q-item-label>
      <div v-if="isHeader" class="q-my-sm">
        <q-item-label>
          <div class="text-grey-5">
            {{ getFormatString(groupData.lastPostCreatedAt, 'YYYY-MM-DD HH:mm (ddd)') }}
          </div>
        </q-item-label>
      </div>
    </q-item-section>
  </q-item>
</template>
