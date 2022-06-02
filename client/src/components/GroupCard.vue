<script setup lang="ts">
import LinkCard from '../components/LinkCard.vue';
import { Group } from '../types/common';
import { toRaw } from 'vue';

const props = defineProps<{ groupData: Group; detail: boolean }>();
const { title, description, links } = toRaw(props.groupData);
const moreLinksTooltip = links
  .slice(3)
  .map((v) => v.ogTitle)
  .join(', ');
</script>

<template>
  <div>
    <q-item>
      <q-item-section>
        <q-item-label>
          <q-item style="padding: 0; min-height: 0">
            <q-item-section class="text-subtitle1 text-weight-bolder">{{ title }}</q-item-section>
            <q-item-section v-if="!detail" side>조회수 999</q-item-section>
          </q-item>
        </q-item-label>
        <q-item-label caption>
          <span class="ellipsis-2-lines">
            {{ description }}
            <q-tooltip max-width="20rem">{{ description }}</q-tooltip>
          </span>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator v-if="detail" spaced inset />

    <q-item>
      <q-item-section>
        <q-item-label v-if="detail" caption>Links</q-item-label>
        <q-item-label>
          <div v-if="links.length > 4" class="row" style="align-items: center">
            <div v-for="(link, i) in links.slice(0, 3)" :key="i" class="col-3 text-center">
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

    <q-separator v-if="detail" spaced inset />
  </div>
</template>

<style scoped></style>
