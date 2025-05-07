<script lang="ts" setup>
import { useMeToast } from '@/core/hooks/useMeToast';
import { es } from '@/core/i18n/primeVue/es.json';
import { gl } from '@/core/i18n/primeVue/gl.json';
import { useToastStore } from '@/core/store/toast';
import BasePageLoader from '@/shared/components/BasePageLoader.vue';
import { usePrimeVue } from 'primevue';
import Toast from 'primevue/toast';
import { onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterView } from 'vue-router';

const { t, locale } = useI18n();
const primevue = usePrimeVue();
const toastStore = useToastStore();
const { showToast } = useMeToast();
const language: { [key: string]: any | undefined } = {
  gl: gl,
  es: es,
};
const unsubscribe = toastStore.$onAction(({ args }) => {
  showToast(args[0]);
});

watch(locale, (newLocale) => {
  changeToLocale(newLocale);
});

function changeToLocale(newLocale: string) {
  primevue.config.locale = language[newLocale] || language.gl;
}

onMounted(() => {
  changeToLocale(locale.value);
});

onUnmounted(() => {
  unsubscribe();
});

defineExpose({
  t,
});
</script>

<template>
  <Toast position="top-right" />

  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition">
      <component :is="Component" />
    </Transition>
  </RouterView>

  <BasePageLoader />
</template>
