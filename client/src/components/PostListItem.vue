<script setup lang="ts">
import { toRefs } from 'vue';
import { Post } from '@/types/common';
import { openUrl } from '@/util/CommUtil';
import { getDateString } from '@/plugin/dayjs';
import LinkInfo from '@/components/Info/LinkInfo.vue';
import { skipBlogName } from '@/util/NameUtil';

const props = defineProps<{ post: Post }>();
const { post } = toRefs(props);
</script>

<template>
  <q-item-label class="cursor-pointer" @click="openUrl(post.url)">
    <q-item>
      <q-item-section side>
        <LinkInfo :link-data="post.link" :posts="true" />
      </q-item-section>
      <q-item-section>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <q-item-label><div class="text-weight-bold ellipsis text-subtitle2" v-html="post.title"></div></q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ post.description || 'ㅤ' }}</q-item-label>
        <q-item-label class="text-grey-5 ellipsis">
          <span class="text-weight-bold">{{ skipBlogName(post.link.title) }}</span> -
          {{ getDateString(post.createdAt) }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator spaced />
  </q-item-label>
</template>
<style lang="scss">
mark {
  color: $green-4;
  background: $grey-2;
}
</style>
