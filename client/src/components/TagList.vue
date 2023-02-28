<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  tagsLoading: boolean;
  tags: { name?: string; label?: string; value?: string }[];
  currentTag?: string;
  prefix?: string;
}>();
const emits = defineEmits<{ (eventName: 'clickTag', tagName: string): void }>();
const currentTag = ref(props.currentTag);

const clickTag = (tagName: string) => {
  currentTag.value = tagName;
  emits('clickTag', tagName);
};
</script>

<template>
  <div class="q-px-md q-pt-md">
    <slot></slot>
    <q-scroll-area class="tag-area" :thumb-style="{ opacity: '0' }">
      <div class="row no-wrap">
        <template v-if="tagsLoading">
          <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
        </template>
        <template v-else>
          <q-chip
            v-for="(tag, i) in tags"
            :key="i"
            :class="{ active: currentTag === (tag.name || tag.value) }"
            clickable
            @click="clickTag(tag.name || tag.value || '')"
            >{{ prefix }}{{ tag.name || tag.label }}
          </q-chip>
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>
<style lang="scss">
.tag-area {
  height: 50px;
  max-width: 900px;

  .active {
    color: white;
    background-color: $primary;
    font-weight: bolder;
  }
}
</style>
