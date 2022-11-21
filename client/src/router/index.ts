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
  const { closeGroupEditor, closeLinkEditor, closeSettingMain, closeStackMain, closeLoginSubpage } = subpageStore;

  const subpages = [
    {
      id: '#Editor',
      cb: () => {
        if (isOpenLinkEditor.value) {
          closeLinkEditor();
          next(false);
        } else {
          closeGroupEditor();
          next();
        }
      },
    },
    {
      id: '#Setting',
      cb: () => {
        if (isOpenDataSubpage.value) {
          closeStackMain();
          next(false);
        } else {
          closeSettingMain();
          next();
        }
      },
    },
    {
      id: '#Login',
      cb: () => {
        closeLoginSubpage();
        next();
      },
    },
  ];

  if (from.name === undefined && subpages.map((page) => page.id).includes(to.hash)) {
    router.replace({ hash: '' });
    return;
  }

  for (const { id, cb } of subpages) {
    if (from.hash === id) return cb();
  }

  next();
});

export default router;
