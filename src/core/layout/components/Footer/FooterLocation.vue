<script setup lang="ts">
import type { FooterItem } from '@/core/dominio/FooterInfo';
import Divider from 'primevue/divider';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
type Props = {
  locations: FooterItem[];
};

const { locations } = defineProps<Props>();
</script>
<template>
  <div class="col-12 col-md-6 d-flex flex-column justify-content-end align-items-end h-100">
    <!-- <div class="mt-auto"> -->
    <div class="d-flex align-items-center gap-2 px-2 me-3">
      <p class="mb-2">{{ t('layout.footer.location') }}</p>
      <i class="pi pi-map-marker"></i>
    </div>

    <div class="d-flex mt-2">
      <div class="d-flex flex-column gap-2">
        <a
          v-for="(item, index) in locations"
          :key="index"
          :href="item.ref"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="item.text"
          class="text-decoration-none text-reset">
          <span style="white-space: pre-line">{{ item.text }}</span>
        </a>
      </div>
      <div class="me-3 d-flex align-items-stretch">
        <Divider layout="vertical" />
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
