<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { LinkWrap } from '@/types/common';
import { useGroupStore } from '@/stores/group';
import GroupDetailStatLast from './components/GroupDetailStatLast/GroupDetailStatLast.vue';
import GroupDetailStatJandi from './components/GroupDetailStatJandi/GroupDetailStatJandi.vue';
import GroupDetailStatDonut from './components/GroupDetailStatDonut.vue';
import ContentsLayout from '@/layouts/ContentsLayout.vue';

const groupStore = useGroupStore();
const { handleSwipeTab } = groupStore;
const _handleSwipe = (newInfo: { direction: 'left' | 'right' }) => handleSwipeTab(newInfo.direction, 'GroupDetailStat');

const props = defineProps<{ links: LinkWrap[] }>();
const { links } = toRefs(props);
</script>

<template>
  <ContentsLayout>
    <div v-touch-swipe.mouse.left.right="_handleSwipe" class="q-px-md q-pb-md stat-area">
      <q-list bordered>
        <q-expansion-item group="somegroup" icon="grass" label="잔디" default-opened header-class="text-green-4">
          <q-card>
            <q-card-section>
              <GroupDetailStatJandi :links="links" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="somegroup"
          icon="fiber_new"
          label="가장 최근에 작성한 로그 Top 3"
          header-class="text-green-3"
        >
          <q-card>
            <q-card-section>
              <GroupDetailStatLast :links="links" />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item
          group="somegroup"
          icon="view_module"
          label="가장 많이 작성한 로그 Top 3"
          header-class="text-green-2"
        >
          <q-card>
            <q-card-section>
              <GroupDetailStatDonut />
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-separator />

        <q-expansion-item group="somegroup" icon="trending_up" label="일주일 방문자수" header-class="text-green-1">
          <q-card>
            <q-card-section> 준비중... </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </ContentsLayout>
</template>
<style lang="scss">
@import './styles/_group-detail-stat.scss';
</style>
