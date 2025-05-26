<script setup lang="ts">
import Breadcrumb from 'primevue/breadcrumb';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const { t } = useI18n();

const breadCrumbsItems = computed(() => {
  const matchedRoutes = route.matched
    .filter((r) => r.meta?.breadcrumbLabel)
    .map((r) => {
      return {
        label: r.meta.breadcrumbLabel ? t(r.meta.breadcrumbLabel) : '',
        command: () => {
          router.push({ name: r.name, params: route.params ? route.params : undefined });
        },
      };
    });

  return matchedRoutes;
});
</script>
<template>
  <Breadcrumb :model="breadCrumbsItems"></Breadcrumb>
</template>
