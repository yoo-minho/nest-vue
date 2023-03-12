<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGroupStore } from '@/stores/group';
import TagList from '@/components/TagList.vue';
import { useRouter } from 'vue-router';

const groupStore = useGroupStore();
const { setCurrentTag } = groupStore;
const { currentTag, NavTags, tagsLoading } = storeToRefs(groupStore);
const router = useRouter();
const clickTag = (tag: string) => {
  setCurrentTag(tag);
  if (tag === 'All') return router.replace({ name: 'Group', query: {} });
  router.replace({ name: 'Group', query: { tag } });
};
</script>

<template>
  <TagList
    :tags-loading="tagsLoading"
    :tags="NavTags"
    :current-tag="currentTag"
    size="sm"
    prefix="#"
    @click-tag="clickTag"
  >
  </TagList>
</template>
