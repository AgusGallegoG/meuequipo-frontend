import type { RouteRecordRaw } from 'vue-router';

export const userRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/usuarios',
    name: 'UserAdmin',
    component: () => import('@/user/views/UserAdmin.vue'),
  },
];
