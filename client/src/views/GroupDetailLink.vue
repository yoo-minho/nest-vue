<script setup lang="ts">
import GroupDetailLinkCard from '../components/GroupDetailLinkCard.vue';
import { Link } from '../types/common';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
</script>

<template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <div v-if="props.loading">
        <div v-for="i in 4" :key="i">
          <q-item class="row">
            <q-item-section avatar class="col-3 items-center">
              <q-skeleton size="48px" />
            </q-item-section>
            <q-item-section class="col-9">
              <q-item-label>
                <q-skeleton type="text" width="60%" />
              </q-item-label>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label>
                <q-skeleton type="text" width="70%" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator spaced />
        </div>
      </div>
      <div v-else>
        <GroupDetailLinkCard v-for="({ link }, i) in props.links" :key="i" :link="link" />
      </div>
    </q-item-section>
  </q-item>
</template>

<style></style>
