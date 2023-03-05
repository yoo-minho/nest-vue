<script setup lang="ts">
import SearchHeader from '@/components/Menu/SearchHeader.vue';
</script>

<template>
  <q-layout>
    <SearchHeader />
    <q-page-container>
      <q-scroll-area class="max-width without-header" :visible="false" :thumb-style="{ zIndex: '999999' }">
        <q-layout style="min-height: 0">
          <q-page-container style="min-height: 0">
            <q-page class="max-width" style="min-height: 0">
              <slot></slot>
            </q-page>
          </q-page-container>
          <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
            <q-btn fab icon="keyboard_arrow_up" :color="'dark'" size="10px" />
          </q-page-scroller>
        </q-layout>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>
