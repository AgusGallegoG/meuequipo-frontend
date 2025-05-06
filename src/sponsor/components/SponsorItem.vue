<script setup lang="ts">
interface Props {
  url: string;
  name: string;
  logo: string;
}

defineProps<Props>();
</script>

<template>
  <div class="sponsor-item text-center mb-4">
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <img :src="logo" :alt="name" class="sponsor-logo" />
    </a>
    <p id="name">{{ name }}</p>
  </div>
</template>

<style lang="css" scoped>
.sponsor-logo {
  width: 150px;
  height: 80px;
  object-fit: contain;
  transition: transform 0.2s ease-in-out;
}
.sponsor-logo:hover {
  transform: scale(1.05);
}
</style>
