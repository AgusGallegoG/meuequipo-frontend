<script lang="ts" setup>
import { useToastStore } from '@/core/store/toast';
import { useMeToast } from '@/core/hooks/useMeToast';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';
import { watch, onMounted, onUnmounted } from 'vue';
import { usePrimeVue } from 'primevue';
import { es } from '@/core/i18n/primeVue/es.json';
import { gl } from '@/core/i18n/primeVue/gl.json';
import BasePageLoader from '@/shared/components/BasePageLoader.vue';

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
