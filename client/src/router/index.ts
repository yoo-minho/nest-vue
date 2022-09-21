import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Group',
    component: () => import('@/views/GroupMain/GroupMain.vue'),
    // meta: { transition: 'subpage' },
  },
  {
    path: '/group-editor',
    name: 'GroupEditor',
    component: () => import('@/views/GroupEditor/GroupEditor.vue'),
    // meta: { transition: 'subpage' },
  },
  {
    path: '/@:domain',
    name: 'GroupDetail',
    props: true,
    component: () => import('@/views/GroupDetail/GroupDetail.vue'),
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
