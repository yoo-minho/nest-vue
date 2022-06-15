import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('./views/GroupMain.vue'),
    meta: { transition: 'slide-left' },
  },
  {
    path: '/group/:id',
    name: 'GroupDetail',
    component: () => import('./views/GroupDetail.vue'),
    meta: { transition: 'slide-right' },
  },
  {
    path: '/stack',
    name: 'Stack',
    component: () => import('./views/StackMain.vue'),
    meta: { transition: 'slide-right' },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('./views/SettingMain.vue'),
    meta: { transition: 'slide-right' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
