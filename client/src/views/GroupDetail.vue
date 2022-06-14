<script setup lang="ts">
import { useRoute } from 'vue-router';
import GroupDetailAsync from './GroupDetailAsync.vue';

const route = useRoute();
const id = +route.params.id;
</script>

<template>
  <Suspense>
    <template #default>
      <GroupDetailAsync :id="id" />
    </template>
    <template #fallback>
      <q-page-container>
        <div v-for="i in 10" :key="i" class="q-pa-md">
          <q-item style="max-width: 300px">
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
    </template>
  </Suspense>
</template>

<style></style>
