<script setup lang="ts">
import HeaderItem from './HeaderItem.vue';
import { useGroupStore } from '../stores/group';
import { useSubpageStore } from '../stores/subpage';
import { useQuasar } from 'quasar';
import { getBlogType } from '../constants';
import { ref } from 'vue';
import { ErrorMessage } from '../types/common';
import OpenGraphTagAPI from '../api/openGraphTag';

const BLOG_EXPRESSION = {
  NAVER: /https:\/\/blog.naver.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  TISTORY: /https:\/\/([0-9a-zA-Z_-]*)\.tistory.com(\/)?([0-9a-zA-Z]*)/gi,
  VELOG: /https:\/\/velog.io\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  BRUNCH: /https:\/\/brunch.co.kr\/@([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  MEDIUM: /https:\/\/medium.com\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  YOUTUBE: /https:\/\/www.youtube.com\/channel\/([0-9a-zA-Z_-]*)(\/)?([0-9a-zA-Z]*)/gi,
  TWITCH: /https:\/\/www.twitch.tv\/([0-9a-zA-Z_-]*)/gi,
};

const { links, addLink } = useGroupStore();
const { closeLinkEditor } = useSubpageStore();

const linkRules = [(val: string): ErrorMessage => val.includes('https://') || '링크에 https://를 포함해주세요!'];

const getErrorMessage = (v: string): string => {
  const resultArr = linkRules.map((func) => func(v));
  if (typeof resultArr[0] === 'string') return resultArr[0];
  return '';
};

const url = ref('');
const rssUrl = ref('');
const isShowRssUrl = ref(false);

const $q = useQuasar();

function checkUrl() {
  const initRssUrl = () => {
    isShowRssUrl.value = false;
    rssUrl.value = '';
  };

  if (url.value.length <= 'https://'.length) {
    initRssUrl();
    return;
  }
  const isAutoRssUrl = Object.entries(BLOG_EXPRESSION)
    .map(([_, v]) => v)
    .reduce((result, curr) => new RegExp(curr).test(url.value) || result, false);
  if (isAutoRssUrl) {
    initRssUrl();
  } else {
    isShowRssUrl.value = true;
  }
}

async function addBlogLink() {
  const errorMessage = getErrorMessage(url.value);
  if ('' !== errorMessage) {
    $q.notify({ type: 'negative', message: errorMessage });
    return;
  }

  const ogsData = await OpenGraphTagAPI.index(url.value);
  if (!ogsData.success) {
    $q.notify({ type: 'negative', message: ogsData.message });
    return;
  }

  addLink({
    index: links.length + 1,
    url: url.value,
    rssUrl: rssUrl.value,
    type: getBlogType(url.value),
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
            v-model.trim="url"
            bottom-slots
            stack-label
            placeholder="링크를 적어주세요"
            label="링크"
            autofocus
            :rules="linkRules"
            @update:model-value="checkUrl"
            @keypress.enter.prevent="addBlogLink"
          >
            <template #hint> ※ 'https://' 포함한 블로그 주소를 입력해주세요! </template>
          </q-input>
          <q-input
            v-if="isShowRssUrl"
            v-model.trim="rssUrl"
            bottom-slots
            stack-label
            placeholder="RSS링크가 필요합니다."
            label="RSS 링크"
            :rules="linkRules"
            @keypress.enter.prevent="addBlogLink"
          >
            <template #hint> ※ 스크래핑이 어려워 rss url을 별도로 입력해주세요! </template>
          </q-input>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style></style>
