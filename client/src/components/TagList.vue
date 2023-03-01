<script setup lang="ts">
defineProps<{
  tagsLoading: boolean;
  tags: { name?: string; label?: string; value?: string }[];
  currentTag?: string;
  prefix?: string;
  size?: 'md' | 'sm';
}>();
const emits = defineEmits<{ (eventName: 'clickTag', tagName: string): void }>();
</script>

<template>
  <div :class="`q-px-${size} q-pt-${size}`">
    <slot></slot>
    <q-scroll-area class="tag-area" :thumb-style="{ opacity: '0' }" :style="{ height: size == 'md' ? '52px' : '44px' }">
      <div class="row no-wrap">
        <template v-if="tagsLoading">
          <q-skeleton v-for="n in 3" :key="n" :type="'QChip'" class="q-ma-xs" />
        </template>
        <template v-else>
          <q-chip
            v-for="(tag, i) in tags"
            :key="i"
            :class="{ active: currentTag === (tag.name || tag.label) }"
            clickable
            @click="emits('clickTag', tag.name || tag.label || '')"
            >{{ prefix }}{{ tag.name || tag.label }}
          </q-chip>
        </template>
      </div>
    </q-scroll-area>
  </div>
</template>
<style lang="scss">
.tag-area {
  max-width: 900px;

  .active {
    color: white;
    background-color: $primary;
    font-weight: bolder;
  }
}
</style>
