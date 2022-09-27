import { createApp } from 'vue';
import { Quasar, Notify, Dialog } from 'quasar';
import { createPinia } from 'pinia';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import App from './App.vue';
import router from './router';
import { mainLog } from './util/ConsoleUtil';

const myApp = createApp(App);
myApp.use(Quasar, {
  plugins: { Notify, Dialog },
});
myApp.use(createPinia());
myApp.use(router);
myApp.config.errorHandler = (error) => {
  const { message } = error as Error;
  Notify.create({ type: 'negative', message });
};
myApp.mount('#app');

mainLog();
