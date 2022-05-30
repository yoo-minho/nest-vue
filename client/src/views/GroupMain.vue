<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import GroupCard from '../components/GroupCard.vue';
import { useGroupStore } from '../stores/group';

const groupStore = useGroupStore();
const { init } = groupStore;
const { groupDataList } = storeToRefs(groupStore);
const router = useRouter();

init();

function clickGroup(id: number): void {
  router.push({ path: `/group/${id}` });
}
</script>

<template>
  <q-page-container class="max-width">
    <q-scroll-area :visible="false" class="max-width container-without-header-n-footer">
      <q-page class="q-pa-md">
        <p v-for="groupData in groupDataList" :key="groupData.index">
          <q-card>
            <q-card-section>
              <GroupCard
                :group-data="groupData"
                :detail="false"
                class="cursor-pointer"
                @click="clickGroup(groupData.index)"
              />
            </q-card-section>
          </q-card>
        </p>
      </q-page>
    </q-scroll-area>
  </q-page-container>
</template>

<style></style>
