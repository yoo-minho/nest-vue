<script setup lang="ts">
import { Link } from '@/types/common';
import LinkCard from '@/components/Card/LinkCard.vue';

const props = defineProps<{ link: Link }>();
</script>

<template>
  <div class="q-my-sm">
    <LinkCard :link="props.link" icon-name="launch" />
  </div>
</template>
<style lang="scss"></style>
