<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useTagStore } from '@/stores/tag';
import { useQuasar } from 'quasar';
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { getImage } from '@/util/ImageUtil';
import { BLOG_TAG } from '@/constants';

const route = useRoute();
const $q = useQuasar();
const tagStore = useTagStore();
const { setCurrentTag, fetchAllBlogTag } = tagStore;
const { currentTag, NavTags, tagsLoading } = storeToRefs(tagStore);
const router = useRouter();
const clickTag = (tag: string) => {
  setCurrentTag(tag);
  router.replace({ name: 'Blog', query: tag === 'All' ? {} : { tag } });
  return;
};
const isMobile = $q.platform.is.mobile;

onMounted(() => {
  setCurrentTag(String(route.query.tag || ''));
  fetchAllBlogTag();
});

const getLabel = (type: string) => {
  return BLOG_TAG.find((v) => v.type === type)?.label || 'All';
};
</script>

<template>
  <div>
    <q-scroll-area
      id="tagScroll"
      style="max-width: 460px; height: 44px"
      :visible="!isMobile"
      :thumb-style="{ opacity: isMobile ? '0' : '0.2', height: '16px' }"
    >
      <div class="row no-wrap q-mx-sm items-center" style="height: 44px">
        <template v-if="tagsLoading">
          <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
        </template>
        <template v-else>
          <q-chip
            v-for="(tag, i) in NavTags"
            :key="i"
            :class="{ active: currentTag === tag.name }"
            outline
            clickable
            @click="clickTag(tag.name || '')"
          >
            <q-avatar v-if="tag.name !== 'All'" size="18px">
              <q-img :src="getImage(`platform/${tag.name.toLowerCase()}.png`)" :no-transition="true" />
            </q-avatar>
            {{ getLabel(tag.name) }}
          </q-chip>
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>
<style lang="scss" scoped>
.active {
  font-weight: bolder;
}
</style>
