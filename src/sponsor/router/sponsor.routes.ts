import type { RouteRecordRaw } from 'vue-router';

export const sponsorRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/patrocinadores',
    name: 'SponsorAdmin',
    component: () => import('@/sponsor/views/SponsorAdmin.vue'),
  },
];
