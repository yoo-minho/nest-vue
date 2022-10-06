<script setup lang="ts">
import { toRefs } from 'vue';
import { LinkWrap } from '@/types/common';
import GroupDetailStatLast from './components/GroupDetailStatLast/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi/GroupDetailStatJandi.vue';
import ContentsLayout from '@/layouts/ContentsLayout.vue';

const props = defineProps<{ links: LinkWrap[]; loading: boolean }>();
const { links } = toRefs(props);
</script>

<template>
  <ContentsLayout>
    <div class="q-px-md q-pb-md stat-area">
      <GroupDetailStatJandi :links="links" :loading="loading" />
      <q-separator class="q-mt-md" />
      <GroupDetailStatLast :links="links" :loading="loading" />
    </div>
  </ContentsLayout>
</template>
<style lang="scss">
@import './styles/_group-detail-stat.scss';
</style>
