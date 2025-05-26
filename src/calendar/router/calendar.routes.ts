import type { RouteRecordRaw } from 'vue-router';

export const calendarRouterAdmin: RouteRecordRaw[] = [
  {
    path: 'dashboard/calendario',
    name: 'CalendarAdmin',
    meta: { breadcrumbLabel: 'admin.breadcrumbs.calendar' },
    component: () => import('@/calendar/views/CalendarAdmin.vue'),
  },
];
