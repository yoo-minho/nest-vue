import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    eslintPlugin(),
    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
});