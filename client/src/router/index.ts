import { createWebHistory, createRouter } from 'vue-router';
import DetailLayout from '@/layouts/DetailLayout.vue';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('@/views/GroupMain/GroupMain.vue'),
  },
  {
    path: '/@:domain',
    name: 'GroupDetail',
    props: true,
    component: DetailLayout,
    children: [
      {
        path: '',
        name: 'GroupDetailLink',
        component: () => import('@/views/GroupDetailLink/GroupDetailLink.vue'),
      },
      {
        path: 'post',
        name: 'GroupDetailPost',
        component: () => import('@/views/GroupDetailPost/GroupDetailPost.vue'),
      },
      {
        path: 'stat',
        name: 'GroupDetailStat',
        component: () => import('@/views/GroupDetailStat/GroupDetailStat.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
