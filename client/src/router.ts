import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('./views/GroupMain.vue'),
  },
  {
    path: '/stack',
    name: 'Stack',
    component: () => import('./views/StackMain.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
