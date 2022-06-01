<script setup lang="ts">
import LinkCard from '../components/LinkCard.vue';
import { Group } from '../types/common';
import { toRaw } from 'vue';

const props = defineProps<{ groupData: Group; detail: boolean }>();
const { title, description, links } = toRaw(props.groupData);
</script>

<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-weight-bolder">{{ title }}</q-item-section>
            <q-item-section v-if="!detail" side>조회수 999</q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption>
          <span class="ellipsis-2-lines">
            {{ description }}
            <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator v-if="detail" spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label v-if="detail" caption>Links</q-item-label>
        <q-item-label class="q-gutter-x-sm row">
          <div v-for="(link, i) in links" :key="i">
            <LinkCard :link-data="link"></LinkCard>
          </div>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator v-if="detail" spaced inset />
  </div>
</template>

<style scoped></style>
