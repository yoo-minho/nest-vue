<script setup lang="ts">
import { toRaw } from 'vue';
import LinkCard from '../components/LinkCard.vue';
import { Link } from '../types/common';

const props = defineProps<{ links: Link[] }>();
const { links } = toRaw(props);
const moreLinksTooltip = links
  .slice(3)
  .map((v) => v.ogTitle)
  .join(', ');
const LIMIT = 4;

</script>

<template>
  <q-item>
    <q-item-section>
      <q-item-label>
        <div v-if="links.length > LIMIT" class="row" style="align-items: center">
          <div v-for="(link, i) in links.slice(0, LIMIT - 1)" :key="i" class="col-3 text-center">
            <LinkCard :link-data="link" :links="true"></LinkCard>
          </div>
          <div class="col-3 text-center">
            <div>
              <q-item-label style="font-size: 36px"><q-icon name="add" size="36px"></q-icon>2</q-item-label>
              <q-tooltip>{{ moreLinksTooltip }}</q-tooltip>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div v-for="(link, i) in links" :key="i" class="col-3 text-center">
            <LinkCard :link-data="link" :links="true"></LinkCard>
          </div>
        </div>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<style scoped></style>
