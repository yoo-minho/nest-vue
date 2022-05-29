<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useGroupStore } from '../stores/group';
import BlogCard from './BlogCard.vue';

const groupStore = useGroupStore();
const { closeGroupEditor, openLinkEditor, initLinks } = groupStore;
const { links, linkCountMessage } = storeToRefs(groupStore);
const groupName = ref('');
const groupDescription = ref('');
const email = ref('');

initLinks();
</script>

<template>
  <q-layout id="groupEditor" class="max-width">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round dense icon="close" @click="closeGroupEditor" />
        <q-toolbar-title>그룹 만들기</q-toolbar-title>
        <q-btn flat round dense icon="done" />
      </q-toolbar>
    </q-header>

    <q-page-container class="max-width">
      <q-page class="q-pa-md">
        <q-form class="q-gutter-y-md column">
          <q-input
            v-model="groupName"
            placeholder="그룹 이름 추가"
            label="그룹 이름"
            counter
            maxlength="20"
            stack-label
            autofocus
            hide-bottom-space
            :rules="[(val) => val?.length > 0 || '그룹 이름을 입력해주세요!']"
          />
          <q-input
            v-model="email"
            label="전용 링크"
            type="email"
            stack-label
            counter
            maxlength="20"
            placeholder="전용 링크 추가"
            prefix="https://"
            suffix=".logcrew.com"
            :rules="[(val) => val?.length > 0 || '도메인을 입력해주세요!']"
          />
          <q-input
            v-model="groupDescription"
            stack-label
            autogrow
            clearable
            counter
            maxlength="100"
            type="textarea"
            label="그룹 설명"
            placeholder="(선택) 그룹 설명을 적어주세요!"
            hide-bottom-space
          />
          <q-btn color="primary" class="full-width" label="블로그 링크 추가" @click="openLinkEditor">
            <span class="link-count-message">{{ linkCountMessage }}</span>
          </q-btn>

          <q-list v-if="links.length > 0" bordered separator class="full-width">
            <div v-for="(v, i) in links" :key="i" :data-index="i">
              <BlogCard :link="{ ...v, index: i }"></BlogCard>
            </div>
          </q-list>
        </q-form>
      </q-page> </q-page-container
    >}
  </q-layout>
</template>

<style>
#groupEditor {
  position: absolute;
  z-index: 2001;
  background-color: white;
}
.link-count-message {
  margin-left: 5px;
}
</style>
