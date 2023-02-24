<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ tagsLoading: boolean; tags: { name: string }[]; currentTag?: string; prefix?: string }>();
const emits = defineEmits<{ (eventName: 'clickTag', tagName: string): void }>();
const currentTag = ref(props.currentTag);

const clickTag = (tagName: string) => {
  currentTag.value = tagName;
  emits('clickTag', tagName);
};
</script>

<template>
  <q-scroll-area class="q-px-md q-pt-md tag-area" :thumb-style="{ opacity: '0' }">
    <div class="row no-wrap">
      <template v-if="tagsLoading">
        <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
      </template>
      <template v-else>
        <q-chip
          v-for="(tag, i) in tags"
          :key="i"
          :class="{ active: currentTag === tag.name }"
          clickable
          @click="clickTag(tag.name)"
          >{{ prefix }}{{ tag.name }}
        </q-chip>
      </template>
    </div>
  </q-scroll-area>
</template>
