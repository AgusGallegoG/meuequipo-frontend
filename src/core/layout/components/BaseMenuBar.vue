<script setup lang="ts">
import { useGetTeamMenuItems } from '@/team/application/useGetTeamMenuItems';
import { Menubar } from 'primevue';
import type { MenuItem } from 'primevue/menuitem';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();
const { refetch: getTeamItems } = useGetTeamMenuItems();

const teamsItems = ref<MenuItem>({
  label: t('core.menubar.label.teams'),
  icon: t('core.menubar.icon.teams'),
  items: [
    {
      label: t('core.menubar.label.not_found'),
    },
  ],
});

const items = ref<MenuItem[]>([
  {
    label: t('core.menubar.label.init'),
    icon: t('core.menubar.icon.init'),
    command: () => {
      router.push({ name: 'Inicio' });
    },
  },
  {
    label: t('core.menubar.label.news'),
    icon: t('core.menubar.icon.news'),
    command: () => {
      router.push({ name: 'News' });
    },
  },
  {
    label: t('core.menubar.label.calendar'),
    icon: t('core.menubar.icon.calendar'),
    command: () => {
      router.push({ name: 'Calendar' });
    },
  },
  teamsItems.value,
  {
    label: t('core.menubar.label.signin'),
    icon: t('core.menubar.icon.signin'),
    command: () => {
      router.push({ name: 'Signin' });
    },
  },
  {
    label: t('core.menubar.label.about'),
    icon: t('core.menubar.icon.about'),
    command: () => {
      router.push({ name: 'About' });
    },
  },
]);

onMounted(async () => {
  await doGetTeamItems();
});

async function doGetTeamItems() {
  const response = await getTeamItems();

  teamsItems.value.items = response;
}
</script>

<template>
  <div class="py-0">
    <Menubar :model="items"></Menubar>
  </div>
</template>
