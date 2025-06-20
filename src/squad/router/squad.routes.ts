import type { RouteRecordRaw } from 'vue-router';

export const squadRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/convocatoria',
    name: 'SquadAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.squad' },
    component: () => import('@/squad/views/SquadAdminCreation.vue'),
  },
];
