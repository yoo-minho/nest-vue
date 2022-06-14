import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('./views/GroupMain.vue'),
  },
  {
    path: '/group/:id',
    name: 'GroupDetail',
    component: () => import('./views/GroupDetail.vue'),
  },
  {
    path: '/stack',
    name: 'Stack',
    component: () => import('./views/StackMain.vue'),
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('./views/SettingMain.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
