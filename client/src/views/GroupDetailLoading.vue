<script setup lang="ts">
import HeaderItem from '../components/HeaderItem.vue';
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <div v-for="i in 10" :key="i" class="q-pa-md">
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="65%" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-page-container>
  </q-layout>
</template>

<style></style>
