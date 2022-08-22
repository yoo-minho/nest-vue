<script setup lang="ts">
import SettingLayout from '@/layouts/SettingLayout.vue';
import { useSubpageStore } from '@/stores/subpage';
import { StackJson } from '@/types/common';
import StackCard from './StackCard.vue';

const subpageStore = useSubpageStore();
const { closeStackMain } = subpageStore;

const props = defineProps<{ stackArray: StackJson[]; title: string }>();
</script>

<template>
  <SettingLayout :title="props.title" @back="closeStackMain">
    <q-scroll-area :visible="false" class="without-header">
      <q-page class="q-py-xs">
        <div v-for="stackJson in props.stackArray" :key="stackJson.name">
          <StackCard :stack-json="stackJson" />
        </div>
      </q-page>
    </q-scroll-area>
  </SettingLayout>
</template>

<style></style>
