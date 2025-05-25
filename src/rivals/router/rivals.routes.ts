import type { RouteRecordRaw } from 'vue-router';

export const rivalsRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/outrosequipos',
    name: 'RivalsAdmin',
    component: () => import('@/rivals/views/RivalsAdmin.vue'),
  },
];
