<script setup lang="ts">
const randomColor = (): string => `step-${Math.floor(Math.random() * 10)}`;
</script>

<template>
  <q-card class="my-card">
    <q-card-section>
      <q-item>
        <q-item-section side>
          <q-avatar rounded color="primary" text-color="white">
            그
            <q-badge floating color="orange">N</q-badge>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>
            <q-item style="padding: 0; min-height: 0">
              <q-item-section>그룹 이름2</q-item-section>
              <q-item-section side>1시간 전</q-item-section>
            </q-item>
          </q-item-label>
          <q-item-label caption>그룹에 대한 설명을 적는 공간입니다.</q-item-label>
        </q-item-section>
      </q-item>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="row">
        <div class="col-3">
          <div class="jandi-desc">598 posts<br />In 2022</div>
        </div>
        <div class="col-9">
          <div class="row">
            <div class="left" style="width: 20%"></div>
            <div class="row" style="width: 80%">
              <div v-for="k in 12" :key="k" class="col-1 jandi-wrap">
                <div class="month">{{ k }}</div>
              </div>
            </div>
          </div>
          <div v-for="n in 5" :key="n" class="row">
            <div class="left" style="width: 20%">{{ n }} week</div>
            <div class="row" style="width: 80%">
              <div v-for="m in 12" :key="m" class="col-1 jandi-wrap">
                <div
                  :class="{
                    jandi: true,
                    [randomColor()]: true,
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.left {
  color: #ccc;
  font-size: 12px;
}

.jandi-desc {
  word-break: break-word;
}

.jandi-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.jandi-wrap .jandi {
  width: 12px;
  height: 12px;
  border-radius: 4px;
}

.jandi-wrap .month {
  font-size: 12px;
  color: #ccc;
}

.step-1 {
  background: rgba(86, 61, 124, 0.1);
}

.step-2 {
  background: rgba(86, 61, 124, 0.2);
}

.step-3 {
  background: rgba(86, 61, 124, 0.3);
}

.step-4 {
  background: rgba(86, 61, 124, 0.4);
}

.step-5 {
  background: rgba(86, 61, 124, 0.5);
}

.step-6 {
  background: rgba(86, 61, 124, 0.6);
}

.step-7 {
  background: rgba(86, 61, 124, 0.7);
}

.step-8 {
  background: rgba(86, 61, 124, 0.7);
}

.step-9 {
  background: rgba(86, 61, 124, 0.7);
}
</style>
