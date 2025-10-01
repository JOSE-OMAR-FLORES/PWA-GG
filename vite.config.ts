import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        // Cachear TODOS los archivos posibles
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,woff2}'],
        
        // Configuración robusta para offline desde cero
        skipWaiting: true,
        clientsClaim: true,
        
        // Runtime caching ultra-agresivo
        runtimeCaching: [
          // 🏠 NAVEGACIÓN - Network First con timeout rápido y fallback
          {
            urlPattern: ({request}) => request.mode === 'navigate',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'navigation-cache',
              networkTimeoutSeconds: 2, // Timeout muy rápido para ir al cache
              plugins: [{
                cacheKeyWillBeUsed: async () => '/index.html'
              }]
            }
          },
          
          // 📄 HTML - Cache First
          {
            urlPattern: /\.(?:html)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'html-cache'
            }
          },
          
          // 🎨 CSS y JS - Cache First (CRÍTICO)
          {
            urlPattern: /\.(?:css|js)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'static-assets-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          
          // 🖼️ IMÁGENES - Cache First
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          
          // 🌐 FONTS - Cache First
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365
              }
            }
          }
        ],
        // Configuración robusta para SPA offline
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/_/, /\/[^/?]+\.[^/]+$/],
        navigateFallbackAllowlist: [/^\/$/],
        
        // Precaching adicional ultra-completo
        additionalManifestEntries: [
          { url: '/', revision: null },
          { url: '/index.html', revision: null },
          { url: '/manifest.json', revision: null },
          { url: '/manifest.webmanifest', revision: null },
          { url: '/favicon.ico', revision: null }
        ],
        
        // Incluir archivos adicionales críticos
        dontCacheBustURLsMatching: /\.\w{8}\./,
        
        // Modo agresivo para offline
        mode: 'production'
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Mi Aplicación PWA - JOFM',
        short_name: 'PWA-JOFM',
        description: 'Progressive Web Application desarrollada con React, TypeScript y Vite',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable any'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable any'
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
})
