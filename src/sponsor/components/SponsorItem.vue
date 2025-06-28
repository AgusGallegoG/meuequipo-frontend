<script setup lang="ts">
import type { ImageView } from '@/shared/dominio/ImageView';

interface Props {
  url: string;
  name: string;
  logo: ImageView | null;
}

defineProps<Props>();
</script>

<template>
  <div class="sponsor-item text-center mb-4 px-2">
    <a :href="url" target="_blank" rel="noopener noreferrer" class="d-inline-block rounded">
      <img
        :id="'team-logo-' + logo.id"
        v-if="logo"
        :src="logo.url"
        :alt="name"
        class="sponsor-logo object-fit-contain"
        loading="lazy"
        crossorigin="anonymous" />
    </a>
    <p id="name">{{ name }}</p>
  </div>
</template>

<style lang="css" scoped>
.sponsor-logo {
  width: 150px;
  height: 80px;
  transition: transform 0.2s ease-in-out;
}

.sponsor-logo:hover {
  transform: scale(1.05);
}
</style>
