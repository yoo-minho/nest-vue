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
    meta: {
      title: '팀로그(teamlog) - 세상의 모든 블로그 한번에 모아보기',
    },
  },
  {
    path: '/posts',
    name: 'Post',
    component: () => import('@/views/PostPage/PostPage.vue'),
    meta: {
      title: '포스트 IN 팀로그(teamlog)',
    },
  },
  {
    path: '/blogs',
    name: 'Blog',
    component: () => import('@/views/BlogPage/BlogPage.vue'),
    meta: {
      title: '블로그 IN 팀로그(teamlog)',
    },
  },
  {
    path: '/noti',
    name: 'Noti',
    component: () => import('@/views/NotiPage/NotiPage.vue'),
    meta: {
      title: '노티 IN 팀로그(teamlog)',
    },
  },
  {
    path: '/my',
    name: 'My',
    component: () => import('@/views/MyPage/MyPage.vue'),
    meta: {
      title: '마이 IN 팀로그(teamlog)',
    },
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
        meta: {
          title: '블로그 IN 팀로그 상세페이지',
        },
      },
      {
        path: '',
        name: 'GroupDetailPost',
        component: () => import('@/views/GroupDetailPost/GroupDetailPost.vue'),
        meta: {
          title: '포스트 IN 팀로그 상세페이지',
        },
      },
      {
        path: 'stats',
        name: 'GroupDetailStat',
        component: () => import('@/views/GroupDetailStat/GroupDetailStat.vue'),
        meta: {
          title: '통계 IN 팀로그 상세페이지',
        },
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
  const { closeGroupEditor, closeLinkEditor, closeSettingMain, closeStackMain } = subpageStore;

  const groupStore = useGroupStore();
  const { initGroupData } = groupStore;

  const tagStore = useTagStore();
  const { initTag, fetchTag } = tagStore;

  const userStore = useUserStore();
  const { initSearchData } = userStore;

  if (to.name === 'Team') {
    initGroupData();
    fetchTag('Team');
  }

  document.title = String(to.meta.title);

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
