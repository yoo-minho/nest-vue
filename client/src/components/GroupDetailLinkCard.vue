<script setup lang="ts">
import { Link } from '../types/common';
import { toRaw } from 'vue';
import LinkCard from './LinkCard.vue';
import { openUrl } from '../util';

const props = defineProps<{ link: Link }>();
const { link } = toRaw(props);
</script>

<template>
  <q-item-label @click="openUrl(link.url)">
    <q-item class="row">
      <q-item-section class="col-3" style="align-items: center">
        <LinkCard :link-data="link" :posts="true"></LinkCard>
      </q-item-section>
      <q-item-section class="col-9">
        <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{ link.title }}</q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ link.description || 'ㅤ' }}</q-item-label>
        <q-item-label class="ellipsis text-grey-5">{{ link.url }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-item-label>
</template>

<style scoped></style>
