import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Subway Sign App',
        short_name: 'Subway Sign',
        description: 'Real-time subway arrival information display',
        theme_color: '#232338',
        background_color: '#232338',
        display: 'standalone',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/scaffolding/_variables.scss";`
      }
    }
  },
  server: {
    port: 3000
  },
  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:5000')
  }
})