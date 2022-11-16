<script setup lang="ts">
import { inject } from 'vue';
import { VueCookies } from 'vue-cookies';
import { useRoute } from 'vue-router';

const route = useRoute();
const $cookies = inject<VueCookies>('$cookies');
$cookies?.set('user_session', route.query.code);
</script>

<template>
  <div>Save Cookie!</div>
</template>
