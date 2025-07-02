import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import AutoImport from 'unplugin-auto-import/vite';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
// https://vite.dev/config/
const BASE = '/';
export default defineConfig(({ mode }) => ({
  base: BASE,
  build: {
    minify: mode !== 'production',
    chunkSizeWarningLimit: 60000,
  },
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLFY_PROD_DEVTOOLS__: false,
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            },
          },
        },
        autoprefixer(),
      ],
    },
  },
  esbuild: {
    minifySyntax: mode !== 'production',
    charset: 'utf8',
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
