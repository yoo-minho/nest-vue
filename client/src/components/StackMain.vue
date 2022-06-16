<script setup lang="ts">
import StackCard from './StackCard.vue';
import stackArray from '../data/stack.json';
</script>

<template>
  <q-layout>
    <q-page-container class="max-width">
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
