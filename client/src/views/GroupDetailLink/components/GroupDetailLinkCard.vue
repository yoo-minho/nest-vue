<script setup lang="ts">
import { Link } from '@/types/common';
import { openUrl } from '@/util';
import LinkCard from '@/components/Card/LinkCard.vue';

const props = defineProps<{ link: Link }>();
</script>

<template>
  <div>
    <q-item-label class="cursor-pointer" @click="openUrl(link.url)">
      <LinkCard :link="props.link" icon-name="launch" />
      <q-separator spaced />
    </q-item-label>
  </div>
</template>
