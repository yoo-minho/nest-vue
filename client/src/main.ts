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

window.onpageshow = function (event) {
  if (event.persisted) {
    alert('onpageshow');
  }
};

window.onhashchange = function (event) {
  alert('onhashchange');
};

window.onpopstate = function () {
  alert('onpopstate');
};

/*
  문제1. 메인 => 디테일 => 메인 에서 뒤로가기하면 디테일로 감 (홈오면 초기화)
  문제2. 메인에서 백버튼 누르면 그냥 바로 꺼짐 (바로 안꺼지게 해야될듯)
  문제3. 에디터 및 세팅 페이지를 라우팅 처리를 다 해버리면, 어디부분을 최기화 해야되는지가 애매 해질 거 같긴함
  문제4. 라우팅은 안하고 임시 새주소 처리를 하면 어떨까?
*/
