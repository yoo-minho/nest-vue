import { createApp } from 'vue';
import { createVueKakaoSdk } from 'vue3-kakao-sdk';
import { Quasar, Notify, Dialog, BottomSheet } from 'quasar';
import { createPinia } from 'pinia';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import { mainLog } from './util/ConsoleUtil';

const myApp = createApp(App);
myApp.use(Quasar, {
  plugins: { Notify, Dialog, BottomSheet },
});
myApp.use(createVueKakaoSdk('e9c455e800755b2e3bb767bdedbf372d'));
myApp.use(createPinia());
myApp.use(router);
myApp.config.errorHandler = (error) => {
  const { message } = error as Error;
  console.error(error);
  Notify.create({ type: 'negative', message });
};
myApp.mount('#app');

mainLog();
