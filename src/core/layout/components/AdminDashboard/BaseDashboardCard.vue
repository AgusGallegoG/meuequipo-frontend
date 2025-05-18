<script setup lang="ts">
import Button from 'primevue/button';
import Card from 'primevue/card';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { t } = useI18n();

interface Props {
  title: string;
  icon: string;
  description: string;
  goToUrl: string;
}

defineProps<Props>();

function goTo(url: string) {
  router.push({ name: url });
}
</script>

<template>
  <div class="col-12 col-sm-6 col-md-4 col-xl-3">
    <Card class="overflow-hidden">
      <template #header v-if="icon">
        <div class="d-flex justify-content-center align-items-center py-3">
          <i :class="[icon, 'fs-1']"></i>
        </div>
      </template>
      <template #title v-if="title">
        <p class="card-title">{{ title }}</p>
      </template>
      <template #content v-if="description">
        <p class="card-description">{{ description }}</p>
      </template>
      <template #footer>
        <Button
          class="w-100"
          :label="t('')"
          icon="pi pi-arrow-up-right"
          icon-pos="right"
          @click="goTo(goToUrl)"></Button>
      </template>
    </Card>
  </div>
</template>

<style lang="css" scoped>
.card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
}

.card-description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  min-height: calc(1.75rem * 3);
}
</style>
