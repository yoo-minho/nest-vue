<script setup lang="ts">
import StackCard from './StackCard.vue';
import stackArray from '../data/stack.json';
import HeaderItem from './HeaderItem.vue';
import { useSubpageStore } from '../stores/subpage';

const subpageStore = useSubpageStore();
const { closeStackMain } = subpageStore;
</script>

<template>
  <q-layout class="max-width subpage">
    <HeaderItem :back="closeStackMain" :title="'기술 스택'" />
    <q-page-container>
      <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
        <q-page class="q-pa-md">
          <div v-for="stackJson in stackArray" :key="stackJson.name">
            <StackCard :stack-json="stackJson" />
          </div>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
