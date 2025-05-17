<script setup lang="ts">
interface Props {
  url: string;
  name: string;
  logo: string;
}

defineProps<Props>();
</script>

<template>
  <div class="sponsor-item text-center mb-4 px-2">
    <a :href="url" target="_blank" rel="noopener noreferrer" class="d-inline-block p-3 rounded">
      <img :src="logo" :alt="name" class="sponsor-logo object-fit-contain" loading="lazy" />
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
