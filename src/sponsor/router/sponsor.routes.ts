import type { RouteRecordRaw } from 'vue-router';

export const sponsorRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'patrocinadores',
    name: 'SponsorAdmin',
    component: () => import('@/sponsor/views/SponsorAdmin.vue'),
  },
];
