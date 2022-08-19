<script setup lang="ts">
import { toRaw } from 'vue';
import { Link } from '@/types/common';
import { openUrl } from '@/util';
import LinkInfo from '@/components/Info/LinkInfo.vue';

const props = defineProps<{ link: Link }>();
const { title, description, url } = toRaw(props.link);
</script>

<template>
  <q-item-label @click="openUrl(link.url)">
    <q-item class="row">
      <q-item-section class="col-3" style="align-items: center">
        <link-info :link-data="link" :posts="true" />
      </q-item-section>
      <q-item-section class="col-9">
        <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{ title }}</q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ description || 'ㅤ' }}</q-item-label>
        <q-item-label class="ellipsis text-grey-5">{{ url }}</q-item-label>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-item-label>
</template>
