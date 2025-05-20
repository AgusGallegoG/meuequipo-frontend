import type { RouteRecordRaw } from 'vue-router';

export const teamRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'equipos',
    name: 'TeamAdmin',
    component: () => import('@/team/views/TeamAdmin.vue'),
  },
];
