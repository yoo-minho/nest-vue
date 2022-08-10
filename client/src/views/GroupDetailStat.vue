<script setup lang="ts">
import GroupDetailStatLast from '../components/GroupDetailStatLast.vue';
import GroupDetailStatJandi from '../components/GroupDetailStatJandi.vue';

import { Link } from '../types/common';
import { toRefs } from 'vue';

const props = defineProps<{ links: { link: Link }[]; loading: boolean }>();
const { links } = toRefs(props);
</script>

<template>
  <div v-if="loading">
    <div class="row q-col-gutter-md q-pa-md">
      <div v-for="n in 6" :key="n" class="col-12">
        <q-skeleton height="4rem" />
      </div>
    </div>
  </div>
  <div v-else class="q-pa-md">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="jandi-card step-3">
          <q-card-section class="column text-white justify-center items-center">
            <div style="font-size: 1rem">꾸준한 기록이 경쟁력 💪</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <GroupDetailStatJandi :links="links" />
    <q-separator class="q-mt-md" />
    <GroupDetailStatLast :links="links" />
  </div>
</template>
<style scoped>
.jandi-card {
  background: #161b22;
}

.step-3 {
  background: #26a641;
}
</style>
