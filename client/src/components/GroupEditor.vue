<script setup lang="ts">
import { ref } from 'vue';
import { getBlogIconUrl } from '../constants';
import { useGroupStore } from '../stores/group';

const { closeGroupEditor, openLinkEditor, links, deleteLink, initLinks } = useGroupStore();
const groupName = ref('');
const groupDescription = ref('');
const email = ref('');

const linkCounter = () => (links.length > 0 ? `(${links.length}/10)` : '');

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
            <span>{{ linkCounter() }}</span>
          </q-btn>

          <q-list v-if="links.length > 0" bordered separator>
            <div v-for="(v, i) in links" :key="i" :data-index="i">
              <q-item clickable>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                    <img :src="getBlogIconUrl(v.type)" alt="" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ v.url }}</q-item-label>
                  <q-item-label caption>{{ v.type }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-icon name="clear" @click="deleteLink(i)" />
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style>
#groupEditor {
  position: absolute;
  z-index: 2001;
  background-color: white;
}
</style>
