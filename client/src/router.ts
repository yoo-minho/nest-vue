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
    props: true,
    component: () => import('./views/GroupDetail.vue'),
    children: [
      {
        path: '',
        name: 'GroupDetailLink',
        component: () => import('./views/GroupDetailLink.vue'),
      },
      {
        path: 'post',
        name: 'GroupDetailPost',
        component: () => import('./views/GroupDetailPost.vue'),
      },
      {
        path: 'stat',
        name: 'GroupDetailStat',
        component: () => import('./views/GroupDetailStat.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
