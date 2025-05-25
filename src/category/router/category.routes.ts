import type { RouteRecordRaw } from 'vue-router';

export const categoryRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'categorias',
    name: 'CategoryAdmin',
    component: () => import('@/category/views/CategoryAdmin.vue'),
  },
];
