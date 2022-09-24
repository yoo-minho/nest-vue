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

const pinia = createPinia();
myApp.use(pinia);

router.beforeEach((to, from, next) => {
  // to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  // from.meta.transitionName = from.name === 'GroupEditor' || to.name === 'GroupEditor' ? '' : ''; //켤떄
  const goGroup = from.name === 'GroupEditor' && to.name === 'Group';
  const goEditor = from.name === 'Group' && to.name === 'GroupEditor';

  // if (from.name === undefined && to.name === 'Group') {
  //   to.meta.transitionName = 'stay'; //group
  // } else if (goEditor) {
  //   // from.meta.transitionName = 'stay'; //group
  //   to.meta.transition = 'subpage';
  // } else if (goGroup) {
  //   to.meta.transitionName = 'subpage'; //group
  // }

  // from.meta.transitionName = goEditor ? 'subpage2' : '';
  console.log('afterEach =================================');
  console.log('from', from.name, from.meta, from);
  console.log('to', to.name, to.meta, to);

  if (from.hash === '#GroupEditor' && to.name === 'Group') {
    // router.replace({ name: 'Group' });
    // next
    //next({ name: 'Group' });
  }

  next();
});

myApp.use(router);

myApp.config.errorHandler = (error) => {
  const { message } = error as Error;
  Notify.create({ type: 'negative', message });
};
myApp.mount('#app');

mainLog();
/*
  문제1. 메인 => 디테일 => 메인 에서 뒤로가기하면 디테일로 감 (홈오면 초기화)
  문제2. 메인에서 백버튼 누르면 그냥 바로 꺼짐 (바로 안꺼지게 해야될듯)
  문제3. 에디터 및 세팅 페이지를 라우팅 처리를 다 해버리면, 어디부분을 최기화 해야되는지가 애매 해질 거 같긴함
  문제4. 라우팅은 안하고 임시 새주소 처리를 하면 어떨까?
*/
