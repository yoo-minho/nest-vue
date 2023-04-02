import { createWebHistory, createRouter } from 'vue-router';
import { useSubpageStore } from '@/stores/subpage';
import { useGroupStore } from '@/stores/group';
import { useTagStore } from '@/stores/tag';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

export const routes = [
  {
    path: '/',
    name: 'Team',
    component: () => import('@/views/TeamPage/TeamPage.vue'),
    children: [
      {
        path: '/posts',
        name: 'Post',
        component: () => import('@/views/PostPage/PostPage.vue'),
      },
      {
        path: '/blogs',
        name: 'Blog',
        component: () => import('@/views/BlogPage/BlogPage.vue'),
      },
      {
        path: '/noti',
        name: 'Noti',
        component: () => import('@/views/NotiPage/NotiPage.vue'),
      },
      {
        path: '/my',
        name: 'My',
        component: () => import('@/views/MyPage/MyPage.vue'),
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
    ],
  },
  {
    path: '/oauth',
    name: 'OAuth',
    component: () => import('@/views/OAuth/OAuth.vue'),
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('@/views/NotFound.vue'),
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

  const groupStore = useGroupStore();
  const { initGroupData } = groupStore;

  const tagStore = useTagStore();
  const { initTag } = tagStore;

  const userStore = useUserStore();
  const { initSearchData } = userStore;

  if (to.name === 'Team') {
    initGroupData();
  }
  if (!to.query.tag) {
    initTag();
  }
  initSearchData();

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

  return next();
});

export default router;
