import '@/core/assets/css/variables.css';
import '@/core/assets/css/scrollbar.css';
import '@/core/assets/css/animations.css';
import '@/core/assets/css/main.css';
import '@/core/assets/css/reset.css';
import 'primeicons/primeicons.css';

import gl from '@/core/i18n/locales/gl.json';
import es from '@/core/i18n/locales/es.json';

import BadgeDirective from 'primevue/badgedirective';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import AnimateOnScroll from 'primevue/animateonscroll';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import Layout from '@/core/layout/BaseLayout.vue';
import router from '@/core/router';
import App from '@/core/App.vue';
import { definePreset } from '@primeuix/themes';

const app = createApp(App);

const xuventudePreset = definePreset(Aura, {
  name: 'xuventude',
  semantic: {
    primary: {
      50: '{amber.50}',
      100: '{amber.100}',
      200: '{amber.200}',
      300: '{amber.300}',
      400: '{amber.400}',
      500: '{amber.500}',
      600: '{amber.600}',
      700: '{amber.700}',
      800: '{amber.800}',
      900: '{amber.900}',
      950: '{amber.950}',
    },
    colorScheme: {
      dark: {
        surface: {
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
        formField: {
          hoverBorderColor: '{primary.color}',
        },
      },
    },
  },
});

const i18n = createI18n({
  legacy: false,
  locale: 'gl',
  fallbackLocale: 'gl',
  messages: {
    gl,
    es,
  },
  globalInjection: true,
});

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);
app.use(PrimeVue, {
  theme: {
    preset: xuventudePreset,
    options: {
      darkModeSelector: '.my-app-dark',
      cssLayer: {
        name: 'primevue',
        order: 'bootstrap, app-styles, primevue',
      },
    },
  },
  ripple: true,
});

app.directive('badge', BadgeDirective);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);
app.directive('animateonscroll', AnimateOnScroll);

app.component('BaseLayout', Layout);

app.mount('#main-wrapper');
