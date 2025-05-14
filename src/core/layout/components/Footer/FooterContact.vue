<script setup lang="ts">
import type { FooterItemContact } from '@/core/dominio/FooterInfo';
import Divider from 'primevue/divider';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
type Props = {
  contacts: FooterItemContact[];
};

const { contacts } = defineProps<Props>();
</script>
<template>
  <div class="col-12 col-md-6 d-flex flex-column h-100">
    <div class="d-flex align-items-center gap-2 px-2">
      <i class="pi pi-address-book"></i>
      <p class="mb-2">{{ t('layout.footer.contact') }}</p>
    </div>
    <div class="d-flex mt-2">
      <div class="me-3 d-flex align-items-stretch">
        <Divider layout="vertical" />
      </div>

      <div class="d-flex flex-column gap-0">
        <a
          v-for="(item, index) in contacts"
          :key="index"
          :href="item.type + item.ref"
          class="text-decoration-none text-reset d-flex align-items-center gap-2">
          <i :class="item.type === 'tel:' ? 'pi pi-phone' : 'pi pi-at'"></i>
          <span>{{ item.text }}</span>
        </a>
      </div>
    </div>
  </div>
</template>
