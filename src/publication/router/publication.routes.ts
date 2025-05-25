import type { RouteRecordRaw } from 'vue-router';

export const publicationRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/blog',
    name: 'BlogAdmin',
    component: () => import('@/publication/views/BlogAdmin.vue'),
  },
];
