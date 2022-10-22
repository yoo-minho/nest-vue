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
  <q-item>
    <q-item-section>
      <q-list :class="{ 'text-center': isHeader }">
        <q-item v-if="isHeader" class="q-pa-none" style="min-height: 0">
          <q-item-section class="text-weight-bold text-green-4"> @{{ domain }}</q-item-section>
        </q-item>
        <q-badge v-if="isWithinAWeek(lastPostCreatedAt)" color="red" label="New" />
        <q-item class="q-pa-none" style="min-height: 0">
          <q-item-section class="text-weight-bolder" style="font-size: 1rem; flex-grow: 3">
            {{ title }}
          </q-item-section>
          <q-item-section
            v-if="!isHeader"
            class="text-grey-5"
            style="font-size: 0.8rem; flex-grow: 1; text-align: right"
          >
            {{ getFormatString(lastPostCreatedAt, 'YYYY-MM-DD') }}
          </q-item-section>
        </q-item>
        <q-item class="q-pa-none ellipsis-3-lines" style="min-height: 0">
          {{ description }}
          <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
        </q-item>

        <template v-if="scrapLoading">
          <q-linear-progress dark rounded indeterminate color="green-4" class="q-mt-sm" />
          <q-linear-progress dark rounded query color="green-2" class="q-mt-sm" />
        </template>

        <template v-else>
          <q-item v-if="isHeader" class="q-pa-none" style="min-height: 0">
            <q-item-section class="text-grey-5" style="font-size: 0.8rem">
              {{ getFormatString(lastPostCreatedAt, 'YYYY-MM-DD HH:mm (ddd)') }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-item-section>
  </q-item>
</template>
