import type { RouteRecordRaw } from 'vue-router';

export const teamRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/equipos',
    name: 'TeamAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.teams' },
    component: () => import('@/team/views/TeamAdmin.vue'),
  },
];
