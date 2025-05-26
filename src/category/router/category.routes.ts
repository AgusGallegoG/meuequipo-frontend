import type { RouteRecordRaw } from 'vue-router';

export const categoryRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/categorias',
    name: 'CategoryAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.category' },
    component: () => import('@/category/views/CategoryAdmin.vue'),
  },
];
