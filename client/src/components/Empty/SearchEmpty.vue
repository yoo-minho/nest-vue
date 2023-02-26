<script setup lang="ts">
import { getImage } from '@/util/ImageUtil';
</script>
<template>
  <div class="column items-center justify-center q-pa-md">
    <img :src="getImage('undraw_adventure.svg')" style="width: 100%; padding: 60px; padding-bottom: 0" />
    <span class="text-h6" style="font-size: 1rem">새로운 검색어를 입력해보세요!</span>
    <span>'|'를 활용하면 OR 검색이 가능합니다.</span>
  </div>
</template>
