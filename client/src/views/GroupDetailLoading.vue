<script setup lang="ts">
import HeaderItem from '../components/HeaderItem.vue';

const tab = 'urls';
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true" />
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <q-item>
            <q-item-section>
              <q-item-label>
                <q-item style="padding: 0; min-height: 0">
                  <q-skeleton type="text" width="40%" height="30px" />
                </q-item>
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text" width="60%" />
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="urls" :label="`urls`" />
            <q-tab name="posts" :label="`posts`" />
            <q-tab name="stat" label="STAT" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="urls">
              <div v-for="i in 3" :key="i">
                <q-item class="row">
                  <q-item-section avatar class="col-3" style="align-items: center">
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
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style></style>
