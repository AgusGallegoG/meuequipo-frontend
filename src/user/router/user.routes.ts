import type { RouteRecordRaw } from 'vue-router';

export const userRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'usuarios',
    name: 'UserAdmin',
    component: () => import('@/user/views/UserAdmin.vue'),
  },
];
