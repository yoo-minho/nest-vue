import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('./views/GroupMain.vue'),
  },
  {
    path: '/@:id',
    name: 'GroupDetail',
    component: () => import('./views/GroupDetail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
