import type { RouteRecordRaw } from 'vue-router';

export const teamRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/equipos',
    name: 'TeamAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.teams' },
    component: () => import('@/team/views/TeamAdmin.vue'),
  },
];

export const teamRouter: RouteRecordRaw[] = [
  {
    path: '/equipo/:id',
    name: 'TeamDetails',
    props: true,
    component: () => import('@/team/views/TeamDetails.vue'),
  },
];
