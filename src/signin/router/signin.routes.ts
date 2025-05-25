import type { RouteRecordRaw } from 'vue-router';

export const signinRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/inscripcions',
    name: 'SigninAdmin',
    component: () => import('@/signin/views/SigninAdmin.vue'),
  },
];
