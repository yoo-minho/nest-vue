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
  <q-item>
    <q-item-section>
      <q-item-label class="row q-pb-md">
        <template v-for="({ link }, i) in showingLinks" :key="i">
          <div class="col-3 link-item">
            <LinkInfo :link-data="link" :links="true" />
          </div>
        </template>
        <template v-if="hiddenLength > 0">
          <div class="col-3 link-item">
            <div style="font-size: 36px; padding: 8px">
              <q-icon name="add" size="36px" />{{ hiddenLength + 1 }}
              <q-tooltip>{{ moreLinksTooltip }}</q-tooltip>
            </div>
          </div>
        </template>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.link-item {
  height: 48px;
  font-size: 36px;
  text-align: center;
}
</style>
