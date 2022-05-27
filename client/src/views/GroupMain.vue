<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import { useGroupStore } from '../stores/group';

const { openGroupEditor } = useGroupStore();
</script>

<template>
  <q-header bordered class="bg-primary text-white max-width">
    <q-toolbar>
      <q-btn flat round dense icon="search" />
      <q-toolbar-title>그룹</q-toolbar-title>
      <q-btn icon="add_circle_outline" flat round dense @click="openGroupEditor" />
    </q-toolbar>
  </q-header>

  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <p v-for="n in 15" :key="n">
          <GroupCard />
        </p>
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
