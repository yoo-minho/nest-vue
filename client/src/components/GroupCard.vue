<script setup lang="ts">
import { Group } from '../types/common';
import { toRaw } from 'vue';

const props = defineProps<{ groupData: Group }>();
const { title, description } = toRaw(props.groupData);
</script>

<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-subtitle1 text-weight-bolder">{{ title }}</q-item-section>
            <q-item-section side>조회수 999</q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption>
          <span class="ellipsis-3-lines">
            {{ description }}
            <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<style scoped></style>
