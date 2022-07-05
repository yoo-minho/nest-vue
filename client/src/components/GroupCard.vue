<script setup lang="ts">
import { Group } from '../types/common';
import { useQuasar } from 'quasar';
import { toRaw, computed } from 'vue';

const $q = useQuasar();

const props = defineProps<{ groupData: Group }>();
const { title, description, id } = toRaw(props.groupData);
const url = computed(() => `https://inglog.io/@${id}`);
const copyUrl = async () => {
  await navigator.clipboard.writeText(url.value);
  $q.notify({ type: 'positive', message: 'Copy Completed!' });
};
</script>

<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-weight-bolder text-subtitle1">{{ title }}</q-item-section>
            <q-item-section side></q-item-section>
          </q-item>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-weight-bold" style="color: #26a641" @click.stop="copyUrl">
              @{{ id }}
            </q-item-section>
            <q-item-section side class="text-right">6k read</q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption>
          <span class="ellipsis-3-lines">
            {{ description }}
            <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<style scoped></style>
