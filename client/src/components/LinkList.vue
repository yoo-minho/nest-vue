<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { toRaw } from 'vue';
import LinkCard from '../components/LinkCard.vue';
import { Link } from '../types/common';

const props = defineProps<{ links: { link: Link }[] }>();
const { links } = toRaw(props);
const moreLinksTooltip = links
  .slice(3)
  .map(({ link: v }) => v.title)
  .join(', ');
const LIMIT = 4;
const remain = computed(() => links.length - LIMIT);
</script>

<template>
  <q-item class="link-list">
    <q-item-section>
      <q-item-label>
        <div v-if="links.length > LIMIT" class="row" style="align-items: center">
          <div v-for="({ link }, i) in links.slice(0, LIMIT - 1)" :key="i" class="col-3">
            <LinkCard :link-data="link" :links="true"></LinkCard>
          </div>
          <div class="col-3">
            <div>
              <q-item-label style="font-size: 36px"><q-icon name="add" size="36px"></q-icon>{{ remain }}</q-item-label>
              <q-tooltip>{{ moreLinksTooltip }}</q-tooltip>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div v-for="({ link }, i) in links" :key="i" class="col-3">
            <LinkCard :link-data="link" :links="true"></LinkCard>
          </div>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped>
.link-list {
  height: 80px;
}
</style>
