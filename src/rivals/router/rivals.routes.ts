import type { RouteRecordRaw } from 'vue-router';

export const rivalsRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/outrosequipos',
    name: 'RivalsAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.rivals' },
    component: () => import('@/rivals/views/RivalsAdmin.vue'),
  },
];
