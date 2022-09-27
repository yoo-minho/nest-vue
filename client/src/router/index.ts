import { createWebHistory, createRouter } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import { storeToRefs } from 'pinia';

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

router.beforeEach((to, from, next) => {
  const subpageStore = useSubpageStore();
  const { isOpenLinkEditor } = storeToRefs(subpageStore);
  const { closeGroupEditor, closeLinkEditor } = subpageStore;

  if (from.name === undefined && to.hash === '#Editor') {
    router.replace({ hash: '' });
    return;
  }

  if (from.hash === '#Editor' && to.name === 'Group') {
    if (isOpenLinkEditor.value) {
      closeLinkEditor();
      next(false);
    } else {
      closeGroupEditor();
      next();
    }
    return;
  }

  next();
});

export default router;
