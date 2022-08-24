<script setup lang="ts">
import { Link } from '@/types/common';
import { openUrl } from '@/util';
import LinkCard from '@/components/Card/LinkCard.vue';

const props = defineProps<{ link: Link }>();
</script>

<template>
  <q-item-label>
    <LinkCard :link="props.link" icon-name="launch" @click-icon="() => openUrl(link.url)" />
    <q-separator spaced />
  </q-item-label>
</template>
