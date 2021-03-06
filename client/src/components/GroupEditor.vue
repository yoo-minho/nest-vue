<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { QSelect, useQuasar } from 'quasar';
import { onMounted, ref } from 'vue';
import { useGroupStore } from '../stores/group';
import { useSubpageStore } from '../stores/subpage';
import BlogCard from './BlogCard.vue';
import HeaderItem from './HeaderItem.vue';

const groupStore = useGroupStore();
const { initLinks, save, existsId, getAll, getAllTag } = groupStore;
const { links, linkCountMessage, TagNames } = storeToRefs(groupStore);

const subpageStore = useSubpageStore();
const { openLinkEditor, closeGroupEditor } = subpageStore;

const title = ref('');
const id = ref('');
const description = ref('');

const idRef = ref();
const selectRef = ref();

const $q = useQuasar();
const titleRules = [(val: string) => val?.length > 0 || '그룹 이름을 입력해주세요!'];
const idRules = [
  (val: string) => val?.length > 0 || '도메인을 입력해주세요!',
  (val: string) => new RegExp(/^[A-Za-z0-9_+]*$/).test(val) || '대소문자, 숫자, 언더바를 활용하여 입력해주세요!',
];

const defaultOptions = TagNames;
const options = ref(defaultOptions);
const tag = ref('');
const selectedTags = ref([] as string[]);

onMounted(() => {
  initLinks();
});

type doneFn = (callbackFn: () => void, afterFn?: (ref: QSelect) => void) => void;

function filterFn(val: string, update: doneFn) {
  const filterVal = TagNames.value.filter((name) => name.includes(val.toLowerCase()));
  update(() => {
    options.value = filterVal.length > 0 ? filterVal : [val];
  });
}

function selectOption() {
  if ((tag.value || '') === '') {
    $q.notify({ type: 'negative', message: '태그를 입력해주세요.' });
    selectRef.value.focus();
    return;
  }
  if (selectedTags.value.includes(tag.value)) {
    $q.notify({ type: 'negative', message: '중복되는 태그가 존재합니다.' });
    selectRef.value.focus();
    tag.value = '';
    return;
  }
  selectedTags.value.push(tag.value);
  tag.value = '';
}

async function saveGroup() {
  if (id.value.length === 0) {
    $q.notify({ type: 'negative', message: '도메인을 입력해주세요!' });
    idRef.value.focus();
    return;
  }
  if (links.value.length === 0) {
    $q.notify({ type: 'negative', message: '최소 1개의 url이 필요합니다.' });
    return;
  }
  // const isDuplicatedById = await existsId(id.value);
  // if (isDuplicatedById) {
  //   $q.notify({ type: 'negative', message: '중복 도메인이 존재합니다.' });
  //   idRef.value.focus();
  //   return;
  // }
  await save(title.value, id.value, description.value, selectedTags.value);

  await getAll();
  await getAllTag();
  closeGroupEditor();
}
</script>

<template>
  <q-layout class="subpage max-width">
    <HeaderItem :close="closeGroupEditor" :title="'그룹 만들기'" :save="saveGroup" />
    <q-page-container class="max-width">
      <q-page class="q-pa-md">
        <q-form class="q-gutter-y-md column">
          <q-input
            v-model="title"
            placeholder="그룹 이름 추가"
            label="그룹 이름"
            counter
            maxlength="20"
            stack-label
            autofocus
            hide-bottom-space
            :rules="titleRules"
          />
          <q-input
            ref="idRef"
            v-model="id"
            label="전용 링크"
            type="email"
            stack-label
            counter
            maxlength="20"
            placeholder="전용 링크 추가"
            prefix="https://inglog.io/@"
            :rules="idRules"
          />
          <q-input
            v-model="description"
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
          <q-select
            ref="selectRef"
            v-model="tag"
            stack-label
            label="태그 추가"
            use-input
            input-debounce="0"
            maxlength="10"
            counter
            :options="options"
            @filter="filterFn"
            @update:model-value="selectOption"
          ></q-select>

          <div class="row">
            <q-chip v-for="(v, i) in selectedTags" :key="i" dense>{{ v }}</q-chip>
          </div>

          <q-btn color="primary" class="full-width" label="블로그 링크 추가" @click="openLinkEditor">
            <span class="q-ml-sm">{{ linkCountMessage }}</span>
          </q-btn>

          <q-list v-if="links.length > 0" bordered separator class="full-width">
            <div v-for="(v, i) in links" :key="i" :data-index="i">
              <BlogCard :index="i" :link="v"></BlogCard>
            </div>
          </q-list>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<style></style>
