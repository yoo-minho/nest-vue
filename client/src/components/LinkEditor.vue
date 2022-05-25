<script setup lang="ts">
import { useGroupStore } from '../stores/group';
import { useQuasar } from 'quasar';
import { BLOGS } from '../constants';
import { ref } from 'vue';
import { BlogType, ErrorMessage } from '../types/common';

const { closeLinkEditor, links, addLink } = useGroupStore();
const $q = useQuasar();
const linkRules = [
  (val: string): ErrorMessage => val.includes('https://') || '링크에 https://를 포함해주세요!',
  (val: string): ErrorMessage => isAvailableUrl(val) || '불가능한 url',
];

const getErrorMessage = (v: string): string => {
  const resultArr = linkRules.map((func) => func(v));
  if (typeof resultArr[0] === 'string') {
    return resultArr[0];
  } else {
    return '';
  }
};
const isUpperIncludes = (x: string, y: string) => x.toUpperCase().includes(y.toUpperCase());
const isAvailableUrl = (url: string): boolean => BLOGS.filter((blog) => isUpperIncludes(url, blog)).length > 0;
const getBlogType = (url: string): BlogType => BLOGS.filter((blog) => isUpperIncludes(url, blog))[0] as BlogType;

const blogUrl = ref('');

function addBlogLink() {
  const errorMessage = getErrorMessage(blogUrl.value);
  if ('' !== errorMessage) {
    $q.notify({ type: 'negative', message: errorMessage });
    return;
  }
  addLink({ url: blogUrl.value, type: getBlogType(blogUrl.value), index: links.length + 1 });
  closeLinkEditor();
}
</script>

<template>
  <q-layout id="linkEditor" class="max-width">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="keyboard_backspace" @click="closeLinkEditor" />
        <q-toolbar-title>링크 추가</q-toolbar-title>
        <q-btn flat round dense icon="done" @click="addBlogLink" />
      </q-toolbar>
    </q-header>

    <q-page-container class="max-width">
      <q-page class="q-pa-md">
        <q-form class="q-gutter-y-md column">
          <q-input v-model="blogUrl" bottom-slots autofocus :rules="linkRules" @keypress.enter.prevent="addBlogLink">
            <template #hint> ※ 'https://' 포함한 블로그 주소를 입력해주세요! </template>
          </q-input>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
#linkEditor {
  position: absolute;
  z-index: 2002;
  background-color: white;
}
</style>
