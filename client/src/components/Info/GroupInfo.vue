<script setup lang="ts">
import { toRefs } from 'vue';
import { Group } from '@/types/common';

const props = defineProps<{ mode: 'HEADER' | 'LIST-ITEM'; groupData: Group }>();
const isHeader = props.mode === 'HEADER';

const { title, description, domain } = toRefs(props.groupData);
</script>

<template>
  <q-item>
    <q-item-section>
      <q-list :class="{ 'text-center': isHeader }">
        <q-item v-if="isHeader" class="q-pa-none" style="min-height: 0">
          <q-item-section class="text-weight-bold text-green-4"> @{{ domain }}</q-item-section>
        </q-item>
        <q-item class="q-pa-none" style="min-height: 0">
          <q-item-section class="text-weight-bolder" style="font-size: 1rem">{{ title }}</q-item-section>
        </q-item>
        <q-item class="q-pa-none ellipsis-3-lines" style="min-height: 0">
          {{ description }}
          <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
        </q-item>
      </q-list>
    </q-item-section>
  </q-item>
</template>
