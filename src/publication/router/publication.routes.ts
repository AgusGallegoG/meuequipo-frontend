import type { RouteRecordRaw } from 'vue-router';

export const publicationRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/blog',
    name: 'BlogAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.blog' },
    component: () => import('@/publication/views/BlogAdmin.vue'),
  },
];

export const publicationRouter: RouteRecordRaw[] = [
  {
    path: 'novas',
    name: 'News',
    component: () => import('@/publication/views/BlogView.vue'),
  },
];
