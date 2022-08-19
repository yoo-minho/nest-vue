<script setup lang="ts">
const props = defineProps<{ count: number }>();
</script>
<template>
  <div class="column" style="align-items: center">
    <div class="row q-gutter-xs jandi-bottom">
      <div class="jandi-comment">Less</div>
      <div class="jandi step-0"></div>
      <div class="jandi step-1"></div>
      <div class="jandi step-2"></div>
      <div class="jandi step-3"></div>
      <div class="jandi step-4"></div>
      <div class="jandi-comment">More</div>
    </div>
    <div class="q-gutter-xs jandi-bottom">
      <div class="jandi-comment">{{ props.count }} posting in the last 3 months</div>
    </div>
  </div>
</template>
<style scoped>
.jandi-bottom {
  margin-top: 4px;
  align-items: center;
  color: #8b949e;
}

.jandi {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  outline-offset: -1px;
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
</style>
