import { createApp } from 'vue';
import { Quasar, Notify, Dialog, BottomSheet, LocalStorage, Dark } from 'quasar';
import { createPinia } from 'pinia';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import { mainLog } from './util/ConsoleUtil';
import VueCookies from 'vue-cookies';
import VueGtag from 'vue-gtag';

Notify.registerType('info', {
  progress: true,
  color: 'green-4',
  textColor: 'white',
});

const myApp = createApp(App);
myApp.use(VueGtag, {
  config: { id: 'G-MRERLPYY1H' },
});
myApp.use(VueCookies, { expires: '7d' });
myApp.use(Quasar, {
  plugins: { Notify, Dialog, BottomSheet, LocalStorage },
});
myApp.use(createPinia());

myApp.use(router);
myApp.config.errorHandler = (error) => {
  const { message } = error as Error;
  console.error(error);
  Notify.create({ type: 'negative', message });
};
myApp.mount('#app');

Dark.set(LocalStorage.getItem('mode') === 'dark');
mainLog();
