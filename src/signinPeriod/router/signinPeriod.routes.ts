import type { RouteRecordRaw } from 'vue-router';

export const signinPeriodRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/inscripcions',
    name: 'SigninAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.signin' },
    component: () => import('@/signinPeriod/views/SigninAdmin.vue'),
  },
];
