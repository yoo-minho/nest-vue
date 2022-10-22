<script setup lang="ts">
import { toRefs } from 'vue';
import { Link } from '@/types/common';
import LinkInfo from '../Info/LinkInfo.vue';

const props = defineProps<{ link: Link; iconName: string }>();
const { url, title, description } = toRefs(props.link);
const emits = defineEmits<{ (eventName: 'clickIcon'): void }>();
const emojiBundle = ['📕', '📊', '🔥', '🎯', '⚡', '🚀', '🏆', '📃', '💻', '📟', '📷', '🌍', '🌐'];
const randomDesc = `Need a description like '${emojiBundle
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)
  .slice(0, 3)
  .join(' ')}'`;
</script>

<template>
  <q-item>
    <q-item-section side>
      <LinkInfo :link-data="link" :links="iconName === 'clear'" :posts="iconName === 'launch'" />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{ title }}</q-item-label>
      <q-item-label class="ellipsis-2-lines text-grey-7">{{ description || randomDesc }}</q-item-label>
      <q-item-label class="ellipsis text-grey-5">{{ url }}</q-item-label>
    </q-item-section>
    <q-item-section side class="cursor-pointer">
      <q-icon :name="iconName" @click="() => emits('clickIcon')" />
    </q-item-section>
  </q-item>
</template>
