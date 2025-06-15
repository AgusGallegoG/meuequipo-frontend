<script setup lang="ts">
import { Menubar } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// const { t } = useI18n();
const router = useRouter();

const items = ref([
  {
    label: 'Novidades',
    icon: 'pi pi-objects-column',
  },
  {
    label: 'Calendario',
    icon: 'pi pi-calendar',
    command: () => {
      router.push({ name: 'Calendar' });
    },
  },
  {
    label: 'Equipos',
    icon: 'pi pi-users',
    items: [
      {
        label: 'Benxamín',
        icon: 'pi pi-bolt',
      },
      {
        label: 'Alevín',
        icon: 'pi pi-server',
      },
      {
        label: 'Infantil',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Masculino',
            icon: 'pi pi-palette',
          },
          {
            label: 'Feminino',
            icon: 'pi pi-palette',
          },
        ],
      },
      {
        label: 'Cadete',
        icon: 'pi pi-palette',
      },
      {
        label: 'Junior',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Masculino',
            icon: 'pi pi-palette',
          },
          {
            label: 'Feminino',
            icon: 'pi pi-palette',
          },
        ],
      },
      {
        label: 'Senior',
        icon: 'pi pi-pencil',
        items: [
          {
            label: 'Masculino',
            icon: 'pi pi-palette',
          },
          {
            label: 'Feminino',
            icon: 'pi pi-palette',
          },
        ],
      },
    ],
  },
  {
    label: 'Sobre nós',
    icon: 'pi pi-palette',
    command: () => {
      router.push({ name: 'About' });
    },
  },
  {
    label: 'Inscripcións',
    icon: 'pi pi-file-edit',
  },
]);
</script>

<template>
  <div class="py-0">
    <Menubar :model="items"></Menubar>
  </div>
</template>
