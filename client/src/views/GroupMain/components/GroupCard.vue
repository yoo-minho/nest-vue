<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Group } from '@/types/common';
import GroupInfo from '@/components/Info/GroupInfo.vue';
import GroupCardLinkList from './GroupCardLinkList.vue';

defineProps<{ group: Group }>();

const router = useRouter();
const clickGroup = (domain: string) => router.push({ path: `/@${domain}` });
</script>

<template>
  <q-card class="cursor-pointer q-mb-md" @click="clickGroup(group.domain)">
    <q-card-section class="q-pa-none">
      <GroupInfo mode="LIST-ITEM" :group-data="group" />
      <GroupCardLinkList :links="group.links || []" />
    </q-card-section>
  </q-card>
</template>
