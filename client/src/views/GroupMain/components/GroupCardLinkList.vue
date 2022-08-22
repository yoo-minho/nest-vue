<script setup lang="ts">
import { computed, toRaw } from 'vue';
import { LinkWrap } from '@/types/common';
import LinkInfo from '@/components/Info/LinkInfo.vue';

const LIMIT = 4;
const props = defineProps<{ links: LinkWrap[] }>();
const { links } = toRaw(props);
const hiddenLength = links.length - LIMIT;
const showingLinks = computed(() => (hiddenLength > 0 ? links.slice(0, LIMIT - 1) : links));
const hiddenLinks = computed(() => [...links].splice(LIMIT - 1));
const moreLinksTooltip = computed(() => hiddenLinks.value.map(({ link: { title } }) => title).join(', '));
</script>

<template>
  <q-item class="link-list">
    <q-item-section>
      <q-item-label>
        <div class="row items-center">
          <div v-for="({ link }, i) in showingLinks" :key="i" class="col-3">
            <link-info :link-data="link" :links="true" />
          </div>
          <template v-if="hiddenLength > 0">
            <div class="col-3">
              <q-item-label class="link-more"><q-icon name="add" size="36px" />{{ hiddenLength }}</q-item-label>
              <q-tooltip>{{ moreLinksTooltip }}</q-tooltip>
            </div>
          </template>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.link-list {
  height: 80px;
}
.link-more {
  font-size: 36px;
}
</style>
