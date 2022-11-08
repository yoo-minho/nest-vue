import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import eslintPlugin from 'vite-plugin-eslint';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig((config) => {
  const { mode } = config;
  const isDev = mode === 'development';
  return {
    define: {
      'process.env': {
        ...config,
        isDev,
        ...(isDev
          ? {
              baseUrl: 'http://localhost:5000/api',
            }
          : {
              baseUrl: '/api',
            }),
      },
    },
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto', //default
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        },
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'Teamlog',
          short_name: 'Teamlog',
          description: 'We log together!',
          display: 'standalone',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-256x256.png',
              sizes: '256x256',
              type: 'image/png',
            },
          ],
        },
      }),
      vue({
        template: { transformAssetUrls },
      }),
      eslintPlugin(),
      quasar({
        sassVariables: 'src/quasar-variables.sass',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
