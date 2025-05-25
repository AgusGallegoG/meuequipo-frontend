import type { RouteRecordRaw } from 'vue-router';

export const calendarRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/calendario',
    name: 'CalendarAdmin',
    component: () => import('@/calendar/views/CalendarAdmin.vue'),
  },
];
