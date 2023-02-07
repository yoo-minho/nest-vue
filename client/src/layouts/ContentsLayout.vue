<!-- <template>
  <q-item class="q-pa-none q-pt-md" style="min-height: 0">
    <q-item-section>
      <div class="max-width"><slot></slot></div>
    </q-item-section>
  </q-item>
</template> -->

<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <q-item class="q-pa-none q-pt-md" style="min-height: 0">
          <q-item-section>
            <div class="max-width"><slot></slot></div>
          </q-item-section>
        </q-item>
        <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
          <q-btn fab icon="keyboard_arrow_up" color="green-4" />
        </q-page-scroller>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
