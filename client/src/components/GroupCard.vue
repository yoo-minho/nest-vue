<script setup lang="ts">
import { Group } from '../types/common';
import { useQuasar } from 'quasar';
import { toRaw, computed } from 'vue';

const $q = useQuasar();

const props = defineProps<{ groupData: Group }>();
const { title, description, id } = toRaw(props.groupData);
const url = computed(() => `https://inglog.io/@${id}`);
const copyUrl = () => {
  navigator.clipboard.writeText(url.value).then(() => {
    $q.notify({ type: 'positive', message: '복사하였습니다.' });
  });
};
</script>

<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-subtitle1 text-weight-bolder">{{ title }}</q-item-section>
            <q-item-section side></q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption style="margin: 0">
          <span class="ellipsis-3-lines">
            {{ description }}
            <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
          </span>
        </q-item-label>
        <q-item style="padding: 0; min-height: 0">
          <q-item-section class="text-subtitle1 text-weight-bold" style="color: #26a641" @click.stop="copyUrl">
            @{{ id }}
          </q-item-section>
          <q-item-section side class="text-right">6k read</q-item-section>
        </q-item>
      </q-item-section>
    </q-item>
  </div>
</template>

<style scoped></style>
