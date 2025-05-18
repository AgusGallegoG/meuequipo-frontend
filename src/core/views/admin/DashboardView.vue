<script setup lang="ts">
import BaseDashboardCard from '@/core/layout/components/AdminDashboard/BaseDashboardCard.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const modules = [
  {
    title: 'admin.dashboard.modules_titles.season',
    description: 'admin.dashboard.modules_desc.season',
    goToModule: 'SeasonAdmin',
    icon: 'pi pi-database',
  },
  {
    title: 'admin.dashboard.modules_titles.team',
    description: 'admin.dashboard.modules_desc.team',
    goToModule: 'TeamAdmin',
    icon: 'pi pi-users',
  },
  {
    title: 'admin.dashboard.modules_titles.news',
    description: 'admin.dashboard.modules_desc.news',
    goToModule: 'BlogAdmin',
    icon: 'pi pi-sparkles',
  },
  {
    title: 'admin.dashboard.modules_titles.calendar',
    description: 'admin.dashboard.modules_desc.calendar',
    goToModule: 'CalendarAdmin',
    icon: 'pi pi-calendar-clock',
  },
  {
    title: 'admin.dashboard.modules_titles.signings',
    description: 'admin.dashboard.modules_desc.signings',
    goToModule: 'SigningAdmin',
    icon: 'pi pi-file-plus',
  },
  {
    title: 'admin.dashboard.modules_titles.sponsors',
    description: 'admin.dashboard.modules_desc.sponsors',
    goToModule: 'SponsorAdmin',
    icon: 'pi pi-thumbs-up',
  },
  {
    title: 'admin.dashboard.modules_titles.users',
    description: 'admin.dashboard.modules_desc.users',
    goToModule: 'UserAdmin',
    icon: 'pi pi-user',
  },
];
</script>
<template>
  <div id="admin-dashboard" class="row gx-4 gy-4 justify-content-center w-75 mx-auto my-auto">
    <BaseDashboardCard
      v-for="(module, index) in modules"
      :key="index"
      :title="t(module.title)"
      :description="t(module.description)"
      :go-to-url="module.goToModule"
      :icon="module.icon"></BaseDashboardCard>
  </div>
</template>
