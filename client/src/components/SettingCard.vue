<script setup lang="ts">
import { toRaw } from 'vue';

interface SettingJson {
  icon: string;
  title: string;
  pushUrl: string;
  clickEvent: () => void;
}
const props = defineProps<{ settingJson: SettingJson }>();
const { icon, title, pushUrl, clickEvent } = toRaw(props.settingJson);
</script>

<template>
  <q-item clickable @click="clickEvent()">
    <q-item-section avatar top>
      <q-avatar :icon="icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label lines="1">{{ title }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon name="navigate_next" />
    </q-item-section>
  </q-item>
</template>

<style></style>
