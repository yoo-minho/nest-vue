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
        path: 'blogs',
        name: 'GroupDetailLink',
        component: () => import('@/views/GroupDetailLink/GroupDetailLink.vue'),
      },
      {
        path: '',
        name: 'GroupDetailPost',
        component: () => import('@/views/GroupDetailPost/GroupDetailPost.vue'),
      },
      {
        path: 'stats',
        name: 'GroupDetailStat',
        component: () => import('@/views/GroupDetailStat/GroupDetailStat.vue'),
      },
    ],
  },
  {
    path: '/oauth',
    name: 'OAuth',
    component: () => import('@/views/OAuth/OAuth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const subpageStore = useSubpageStore();
  const { isOpenLinkEditor, isOpenDataSubpage } = storeToRefs(subpageStore);
  const { closeGroupEditor, closeLinkEditor, closeSettingMain, closeStackMain } = subpageStore;

  if (from.name === undefined && ['#Editor', '#Setting'].includes(to.hash)) {
    router.replace({ hash: '' });
    return;
  }

  if (from.hash === '#Editor') {
    if (isOpenLinkEditor.value) {
      closeLinkEditor();
      next(false);
    } else {
      closeGroupEditor();
      next();
    }
    return;
  }

  if (from.hash === '#Setting') {
    if (isOpenDataSubpage.value) {
      closeStackMain();
      next(false);
    } else {
      closeSettingMain();
      next();
    }
    return;
  }

  next();
});

export default router;
