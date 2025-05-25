import type { RouteRecordRaw } from 'vue-router';

export const categoryRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/categorias',
    name: 'CategoryAdmin',
    component: () => import('@/category/views/CategoryAdmin.vue'),
  },
];
