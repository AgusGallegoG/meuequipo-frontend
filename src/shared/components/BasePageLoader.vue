<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner';
import { usePageLoaderStore } from '@/shared/store/pageLoaderStore';
import { computed } from 'vue';

const pageLoadeStore = usePageLoaderStore();
const isLoading = computed(() => pageLoadeStore.getIsLoading);
const message = computed(() => pageLoadeStore.getMessage);
</script>

<template>
  <div v-if="isLoading" class="page-loader">
    <div class="loader-content">
      <ProgressSpinner
        style="width: 70px; height: 70px"
        strokeWidth="8"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner" />
      <p class="loader-message">{{ message }}</p>
    </div>
  </div>
</template>

<style lang="css" scoped>
.page-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(55, 44, 44, 0.738);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease-in-out;
  pointer-events: all;
}

.loader-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.loader-message {
  font-size: 1.1rem;
  color: var(--white);
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
