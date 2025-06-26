import type { RouteRecordRaw } from 'vue-router';

export const signinRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/xogadores',
    name: 'PlayerAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.player' },
    component: () => import('@/player/views/PlayerAdmin.vue'),
  },
];
