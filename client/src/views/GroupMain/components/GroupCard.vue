<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Group } from '@/types/common';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupCardLinkList from './GroupCardLinkList.vue';

const router = useRouter();
const props = defineProps<{ group: Group }>();
const clickGroup = (domain: string) => router.push({ path: `/@${domain}` });
</script>

<template>
  <q-card class="cursor-pointer q-mb-md" @click="clickGroup(props.group.domain)">
    <q-card-section class="q-pa-none">
      <group-info mode="LIST-ITEM" :group-data="props.group" />
      <group-card-link-list :links="props.group.links || []" />
    </q-card-section>
  </q-card>
</template>
