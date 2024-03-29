<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Group } from '@/types/common';
import { isTextImage } from '@/util/ImageUtil';
import { getFormatString } from '@/plugin/dayjs';

defineProps<{ group: Group }>();

const router = useRouter();
const clickGroup = (domain: string) => router.push({ path: `/@${domain}` });
</script>
<template>
  <q-item-label class="cursor-pointer row q-mx-sm items-center" @click="clickGroup(group.domain)">
    <div class="image_area row justify-center content-center">
      <div v-for="(v, i) in group.links?.slice(0, 4)" :key="i" class="image_item">
        <q-avatar
          v-if="isTextImage(v.link.imagePath)"
          color="black"
          text-color="white"
          rounded
          size="32px"
          class="shadow-1"
        >
          <div class="non-selectable">{{ v.link.title.substring(0, 2) }}</div>
        </q-avatar>
        <q-avatar v-else rounded size="32px" color="black" text-color="white" class="shadow-1">
          <q-img :src="v.link.imagePath" :alt="v.link.title" class="image-32" no-spinner :ratio="1" loading="eager">
            <template #error>
              <div class="absolute-full flex flex-center bg-negative text-white" style="padding: 0">
                {{ v.link.title.substring(0, 2) }}
              </div>
            </template>
          </q-img>
        </q-avatar>
      </div>
    </div>
    <q-item class="col q-px-sm">
      <q-item-section>
        <q-item-label class="text-weight-bolder row" style="font-size: 16px">
          <span>
            <span>{{ group.title }}</span>
            <span class="text-grey-5 q-mx-sm">{{ group.links?.length }}</span>
          </span>
        </q-item-label>
        <q-item-label class="ellipsis-2-lines">{{ group.description }}</q-item-label>
        <q-item-label class="text-grey-5">
          {{ getFormatString(group.lastPostCreatedAt, 'YYYY-MM-DD HH:mm (ddd)') }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-item-label>
  <q-separator spaced />
</template>
<style scope>
.image_area {
  width: 80px;
  height: 80px;
  margin: 4px 0 0 4px;
}
.image_item {
  margin: 0 4px 4px 0;
}
</style>
