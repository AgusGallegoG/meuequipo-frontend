<script setup lang="ts">
import { useGetFooterResource } from '@/core/application/useGetFooterResource';
import { emptyFooterInfo, type FooterInfo } from '@/core/dominio/FooterInfo';
import FooterContact from '@/core/layout/components/Footer/FooterContact.vue';
import FooterLocation from '@/core/layout/components/Footer/FooterLocation.vue';
import FooterSocials from '@/core/layout/components/Footer/FooterSocials.vue';
import Divider from 'primevue/divider';
import { onMounted, ref } from 'vue';

const footerContent = ref<FooterInfo>({ ...emptyFooterInfo });
const { refetch } = useGetFooterResource();

onMounted(async () => {
  const response = await refetch();

  footerContent.value = { ...response };
});
</script>

<template>
  <div id="base-footer" class="fluid-container p-5" v-if="footerContent">
    <div
      class="row align-items-stretch"
      v-if="footerContent.contact.length && footerContent.direction.length">
      <FooterContact :contacts="footerContent.contact" />
      <FooterLocation :locations="footerContent.direction" />
    </div>
    <div class="row mt-3" v-if="footerContent.socials.length">
      <FooterSocials :socials="footerContent.socials" />
    </div>
    <Divider class="my-5" />
    <div class="row">
      <div class="col-12 d-flex align-items-center justify-content-center">
        <small class="text-white-50">
          {{ footerContent.reserved.text }}
        </small>
      </div>
    </div>
  </div>
</template>
