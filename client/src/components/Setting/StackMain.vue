<script setup lang="ts">
import HeaderItem from '@/components/Menu/HeaderItem.vue';
import { useSubpageStore } from '@/stores/subpage';
import { StackJson } from '@/types/common';
import StackCard from './StackCard.vue';

const subpageStore = useSubpageStore();
const { closeStackMain } = subpageStore;

const props = defineProps<{ stackArray: StackJson[]; title: string }>();
</script>

<template>
  <q-layout class="max-width subpage">
    <HeaderItem :back="closeStackMain" :title="title" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="q-py-xs">
          <div v-for="stackJson in props.stackArray" :key="stackJson.name">
            <StackCard :stack-json="stackJson" />
          </div>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
