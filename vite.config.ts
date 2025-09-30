import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'public',
      filename: 'service-worker.js',
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: false, // Usamos nuestro manifest.json personalizado
      injectManifest: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,woff2}'],
        globIgnores: ['**/node_modules/**/*'],
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
})
