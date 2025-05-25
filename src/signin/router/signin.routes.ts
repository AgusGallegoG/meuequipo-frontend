import type { RouteRecordRaw } from 'vue-router';

export const signinRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'inscripcions',
    name: 'SigninAdmin',
    component: () => import('@/signin/views/SigninAdmin.vue'),
  },
];
