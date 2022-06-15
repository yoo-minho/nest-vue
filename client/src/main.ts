import { createApp } from 'vue';
import { Quasar, Notify, Dialog } from 'quasar';
import { createPinia } from 'pinia';
import * as axios from 'axios';

import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/src/css/index.sass';

import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

import App from './App.vue';

import router from './router';

const myApp = createApp(App);

myApp.provide('axios', axios);

myApp.use(Quasar, {
  plugins: { Notify, Dialog },
});

myApp.use(createPinia());
myApp.use(router);
myApp.mount('#app');
