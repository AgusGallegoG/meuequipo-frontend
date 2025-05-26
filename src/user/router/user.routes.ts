import type { RouteRecordRaw } from 'vue-router';

export const userRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/usuarios',
    name: 'UserAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.user' },
    component: () => import('@/user/views/UserAdmin.vue'),
  },
];
