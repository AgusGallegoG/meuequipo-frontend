import type { RouteRecordRaw } from 'vue-router';

export const signinRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/inscripcions',
    name: 'SigninAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.signin' },
    component: () => import('@/signin/views/SigninAdmin.vue'),
  },
];
