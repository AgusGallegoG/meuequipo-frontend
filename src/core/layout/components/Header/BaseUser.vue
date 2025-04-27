<script setup lang="ts">
import { useLogout } from '@/auth/application/useLogout';
import { useAuthStore } from '@/auth/store/authStore';
import { Avatar } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Menu from 'primevue/menu';

const authStore = useAuthStore();
const { t } = useI18n();
const { logout: doLogout } = useLogout();

const menu = ref(); // Referencia al menu
const menuItems = ref([
  {
    label: authStore.getEmail, // Mostramos el email como no-clickable
    disabled: true,
  },
  {
    separator: true,
  },
  {
    label: t('core.header_menu.logout'),
    icon: 'pi pi-sign-out',
    command: () => logout(),
  },
]);

function logout() {
  doLogout();
}

function toggleMenu(event: MouseEvent) {
  menu.value.toggle(event);
}
</script>
<template>
  <div
    id="base-user-logged"
    class="d-flex flex-row-reverse align-items-center justify-content-lg-around">
    <div id="base-user-logged-name" class="d-flex">
      <span> {{ authStore.getUsername }} </span>
    </div>
    <Avatar icon="pi pi-user" class="" size="large" shape="circle" @click="toggleMenu" />
    <Menu ref="menu" :model="menuItems" popup></Menu>
  </div>
</template>
