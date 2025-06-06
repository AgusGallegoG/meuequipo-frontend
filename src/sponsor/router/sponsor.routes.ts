import type { RouteRecordRaw } from 'vue-router';

export const sponsorRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/patrocinadores',
    name: 'SponsorAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.sponsor' },
    component: () => import('@/sponsor/views/SponsorAdmin.vue'),
  },
];
