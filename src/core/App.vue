<script lang="ts" setup>
import { usePageLoadStore } from './store/pageLoad';
import { useToastStore } from './store/toast';
import { useMeToast } from './hooks/useMeToast';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import Toast from 'primevue/toast';
import { watch, ref, onMounted, onUnmounted } from 'vue';
import { usePrimeVue } from 'primevue';
import { es } from '@/core/i18n/primeVue/es.json';
import { gl } from '@/core/i18n/primeVue/gl.json';

const { t, locale } = useI18n();
const primevue = usePrimeVue();
const pageLoadStore = usePageLoadStore();
const toastStore = useToastStore();
const { showToast } = useMeToast();
const loadingPageLoader = ref(false);
const textPageLoader = ref('');
const language: { [key: string]: any | undefined } = {
  gl: gl,
  es: es,
};
const unsubscribe = toastStore.$onAction(({ args }) => {
  showToast(args[0]);
});

watch(pageLoadStore, ({ loading, text }) => {
  loadingPageLoader.value = loading;
  textPageLoader.value = text;
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

  <Transition name="fade" mode="in-out">
    <BasePageLoader :loading="loadingPageLoader" :text="textPageLoader" />
  </Transition>

  <RouterView v-slot="{ Component, route }">
    <Transition :name="route.meta.transition">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
