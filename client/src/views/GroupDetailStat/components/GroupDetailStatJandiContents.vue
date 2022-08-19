<script setup lang="ts">
import { isToday } from '@/plugin/dayjs';
import { DaysCounts } from '@/types/common';
const props = defineProps<{ loading: boolean; data: DaysCounts[] }>();
</script>
<template>
  <div>
    <div v-if="props.loading" class="column jandi-area justify-center items-center">
      <q-spinner color="white" size="6em" :thickness="3" />
    </div>
    <div v-else class="column jandi-area">
      <div v-for="(v, i) in props.data" :key="i" class="jandi-wrap">
        <div class="jandi-month">{{ v.month }}</div>
        <div :class="{ jandi: true, [`step-${v.count}`]: true }">
          <q-tooltip>
            {{ v.count === 0 ? 'No' : v.count }} posting on {{ v.date }}
            {{ isToday(v.date) ? '(Today)' : '' }}
          </q-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.jandi-area {
  padding-top: 20px;
  height: 160px;
  width: 300px;
}
.jandi-wrap {
  width: auto;
  height: 14%;
}
.jandi-month {
  position: absolute;
  top: 12px;
  color: #f0f6fc;
}

.jandi {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  outline-offset: -1px;
}

.step-0 {
  background: #161b22;
}

.step-1 {
  background: #0e4429;
}

.step-2 {
  background: #006d32;
}

.step-3 {
  background: #26a641;
}

.step-4 {
  background: #39d353;
}
</style>
