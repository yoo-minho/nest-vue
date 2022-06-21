<script setup lang="ts">
import GroupCard from '../components/GroupCard.vue';
import HeaderItem from '../components/HeaderItem.vue';
import {useGroupStore} from '../stores/group';
import RssAPI from '../api/rss';
import {ref} from 'vue';
import {Link, Post, CountGroupByDate} from '../types/common';
import GroupDetailLinkCard from '../components/GroupDetailLinkCard.vue';
import GroupDetailPostCard from '../components/GroupDetailPostCard.vue';
import LinkCard from '../components/LinkCard.vue';
import {delay} from '../util';
import {enumerateDaysFromNMonths, getDateStringByMs, getAgoStringByMs, isToday} from '../plugin/dayjs';

const getPostsByLinks = async (links: Link[]): Promise<Post[]> => (await Promise.all(links.map(RssAPI.index)));

const groupStore = useGroupStore();
const {getGroupData} = groupStore;
const props = defineProps<{ id: number }>();
const currentGroupData = await getGroupData(props.id);
const {links} = currentGroupData;
const posts = await getPostsByLinks(links);
const sortPosts = posts.flat().sort((x, y) => y.created - x.created);
const minCreatedByLink = posts.map(post => {
  const minCreated = post[0].created;
  return {
    linkInfo: post[0].linkInfo,
    minCreated: minCreated,
    dateString: getDateStringByMs(minCreated),
    agoString: getAgoStringByMs(minCreated)
  }
}).sort((x, y) => x.minCreated - y.minCreated);

console.log({minCreatedByLink})

const tab = ref('urls');

const result = sortPosts.reduce((total: CountGroupByDate, value) => {
  const dateString = getDateStringByMs(value.created);
  total[dateString] = (total[dateString] || 0) + 1;
  return total;
}, {});

const res = enumerateDaysFromNMonths(3).map((v) => ({
  ...v,
  count: result[v.date] || 0,
}));

const medal = i => ['🥇', '🥈', '🥉'][i];

await delay(500);
</script>

<template>
  <q-layout class="max-width">
    <HeaderItem :logo="true" :setting="true"/>
    <q-page-container>
      <q-scroll-area :visible="false" class="without-header">
        <q-page class="max-width">
          <GroupCard :group-data="currentGroupData" :detail="true"/>
          <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              narrow-indicator
          >
            <q-tab name="urls" :label="`urls (${links.length})`"/>
            <q-tab name="posts" :label="`posts (${sortPosts.length})`"/>
            <q-tab name="stat" label="STAT"/>
          </q-tabs>

          <q-separator/>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="urls">
              <q-item style="padding: 0; min-height: 0">
                <q-item-section>
                  <GroupDetailLinkCard v-for="(link, i) in links" :key="i" :link="link"/>
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="posts">
              <q-item style="padding: 0; min-height: 0">
                <q-item-section>
                  <GroupDetailPostCard v-for="(post, i) in sortPosts" :key="i" :post="post"/>
                </q-item-section>
              </q-item>
            </q-tab-panel>

            <q-tab-panel name="stat">
              <div class="text-h6">Posting Graph</div>
              <q-card class="jandi-card">
                <q-card-section class="row" style="align-items: center; justify-content: center;">
                    <div>
                      <div class="column jandi-area">
                        <div v-for="(v, i) in res" :key="i" class="jandi-wrap">
                          <div class="jandi-month">{{ v.month }}</div>
                          <div
                              :class="{
                              jandi: true,
                              [`step-${v.count}`]: true,
                            }"
                          >
                            <q-tooltip>
                              {{ v.count === 0 ? 'No' : v.count }} posting on {{ v.date }}
                              {{ isToday(v.date) ? '(Today)' : '' }}</q-tooltip
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  <div class="row q-gutter-xs jandi-bottom">
                      <div class="jandi-comment">Less</div>
                      <div class="jandi step-0"></div>
                      <div class="jandi step-1"></div>
                      <div class="jandi step-2"></div>
                      <div class="jandi step-3"></div>
                      <div class="jandi step-4"></div>
                      <div class="jandi-comment">More</div>
                    </div>
                </q-card-section>
              </q-card>

              <q-separator style="margin: 24px 0"></q-separator>

              <div class="text-h6">Ranking since last post</div>
              <q-card class="jandi-card">
                <q-card-section>
                  <div class="text-white">
                    <q-list dark bordered separator>
                      <q-item v-for="(v, i) in minCreatedByLink" :key="i" clickable>
                        <q-item-section class="col-3" style="align-items: center">
                          <LinkCard :link-data="v.linkInfo" :posts="true"></LinkCard>
                        </q-item-section>
                        <q-item-section class="col-6">
                          <q-item-label class="text-weight-bold ellipsis text-subtitle2">{{
                              v.linkInfo.ogTitle
                            }}</q-item-label>
                          <q-item-label class="ago-string">{{ v.agoString }}</q-item-label>
                          <q-item-label class="ellipsis text-grey-5">{{ v.dateString }}</q-item-label>
                        </q-item-section>
                        <q-item-section class="col-3">
                          <q-item-label>Rank {{
                              i + 1
                            }} {{medal(i)}}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </div>
                </q-card-section>
              </q-card>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-scroll-area>
    </q-page-container>
  </q-layout>
</template>

<style>
.jandi-card {
  background: #161b22;
}

.jandi-area {
  padding-top: 20px;
  height: 160px;
  width: 300px;
}

.jandi-wrap {
  width: auto;
  height: 14%;
}

.jandi-bottom {
  margin-top: 4px;
  align-items: center;
  color: #8b949e;
}

.jandi-month {
  position: absolute;
  top: 12px;
  color: #f0f6fc;
}

.jandi {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  outline-offset: -1px;
}

.ago-string {
  color: #26a641;
}

.step-0 {
  background: #161b22;
}

.step-1 {
  background: #0e4429;
}

.step-2 {
  background: #006d32;
}

.step-3 {
  background: #26a641;
}

.step-4 {
  background: #39d353;
}

--color-calendar-graph-day-L1-bg: #0e4429

;
--color-calendar-graph-day-L2-bg: #006d32

;
--color-calendar-graph-day-L3-bg: #26a641

;
--color-calendar-graph-day-L4-bg: #39d353

;
</style>
