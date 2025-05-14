<script setup lang="ts">
import type { FooterItem } from '@/core/dominio/FooterInfo';
import { socialsMap } from '@/core/dominio/SocialsMap';

type Props = {
  socials: FooterItem[];
};

const { socials } = defineProps<Props>();
</script>
<template>
  <div id="socialsFooter" class="col-12 d-flex justify-content-center">
    <div class="d-flex gap-4">
      <a
        v-for="(social, index) in socials"
        :key="index"
        target="_blank"
        rel="noopener noreferrer"
        :href="social.ref"
        :aria-label="social.text"
        class="text-decoration-none text-reset">
        <i class="fs-3" :class="socialsMap[social.text]"></i>
      </a>
    </div>
  </div>
</template>
