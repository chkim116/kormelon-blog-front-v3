export const NAV_BAR_MENU_ITEM_LIST = [
  {
    label: 'Blog',
    href: '/blog',
    isExternal: false,
  },
  {
    label: 'Categories',
    href: '/categories',
    isExternal: false,
  },
  {
    label: 'Now',
    href: '/now',
    isExternal: false,
  },
  // TODO: resume 재단장 후 해제
  // {
  //   label: 'Resume',
  //   href: 'https://kimchanghoe.notion.site/kimchanghoe/3cd2b466abf34924a81f1a77f20f060f',
  //   isExternal: true,
  // },
];

export const NAV_BAR_MEMBER_USER_MENU_ITEM_LIST = [
  {
    key: 'profile',
    label: '',
  },
  {
    key: 'logout',
    label: '로그아웃',
  },
];

export const NAV_BAR_ADMIN_USER_MENU_ITEM_LIST = [
  {
    key: 'profile',
    label: '',
  },
  {
    key: '/blog/write',
    label: '글작성',
  },
  {
    key: '/settings/category',
    label: '카테고리설정',
  },
  {
    key: '/blog/private',
    label: '비밀글',
  },
  {
    key: 'logout',
    label: '로그아웃',
  },
];
