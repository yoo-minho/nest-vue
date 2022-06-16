<script setup lang="ts">
import HeaderItem from './HeaderItem.vue';
import { useGroupStore } from '../stores/group';
import { useSubpageStore } from '../stores/subpage';
import { useQuasar } from 'quasar';
import { BLOGS } from '../constants';
import { ref } from 'vue';
import { BlogType, ErrorMessage } from '../types/common';
import OpenGraphTagAPI from '../api/openGraphTag';

const { links, addLink } = useGroupStore();
const { closeLinkEditor } = useSubpageStore();

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
const isAvailableUrl = (url: string): boolean =>
  BLOGS.filter((blog) => {
    console.log({ url, blog });
    return isUpperIncludes(url, blog);
  }).length > 0;
const getBlogType = (url: string): BlogType => BLOGS.filter((blog) => isUpperIncludes(url, blog))[0] as BlogType;

const blogUrl = ref('');

async function addBlogLink() {
  const errorMessage = getErrorMessage(blogUrl.value);
  if ('' !== errorMessage) {
    $q.notify({ type: 'negative', message: errorMessage });
    return;
  }

  const ogsData = await OpenGraphTagAPI.index(blogUrl.value);
  if (!ogsData.success) {
    $q.notify({ type: 'negative', message: ogsData.message });
    return;
  }

  addLink({
    index: links.length + 1,
    url: blogUrl.value,
    type: getBlogType(blogUrl.value),
    ogTitle: ogsData.ogTitle,
    ogDescription: ogsData.ogDescription,
    ogImageUrl: ogsData.ogImage.url,
  });
  closeLinkEditor();
}
</script>

<template>
  <q-layout class="max-width subpage">
    <HeaderItem :back="closeLinkEditor" :title="'링크 추가'" :save="addBlogLink" />
    <q-page-container class="max-width">
      <q-page class="q-pa-md">
        <q-form class="q-gutter-y-md column">
          <q-input
            v-model.trim="blogUrl"
            bottom-slots
            autofocus
            :rules="linkRules"
            @keypress.enter.prevent="addBlogLink"
          >
            <template #hint> ※ 'https://' 포함한 블로그 주소를 입력해주세요! </template>
          </q-input>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style></style>
