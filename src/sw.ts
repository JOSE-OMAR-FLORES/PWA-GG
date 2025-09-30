/// <reference types="vite/client" />
/// <reference lib="webworker" />

import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

// Limpiar cachés obsoletos
cleanupOutdatedCaches()

// Precacheo del App Shell y assets estáticos
precacheAndRoute(self.__WB_MANIFEST)

// Estrategia para la navegación (App Shell)
const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$')
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false
    }
    if (url.pathname.startsWith('/_')) {
      return false
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false
    }
    return true
  },
  createHandlerBoundToURL('/index.html')
)

// Estrategia para imágenes - Cache First
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'pwa-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
)

// Estrategia para CSS y JS - Stale While Revalidate
registerRoute(
  ({ request }) => 
    request.destination === 'style' || 
    request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'pwa-static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 días
      }),
    ],
  })
)

// Estrategia para fuentes - Cache First
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'pwa-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 365 * 24 * 60 * 60, // 1 año
      }),
    ],
  })
)

// Estrategia para API calls - Network First con fallback
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'pwa-api-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 5 * 60, // 5 minutos
      }),
    ],
  })
)

// Estrategia para recursos externos - Stale While Revalidate
registerRoute(
  ({ url }) => 
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com' ||
    url.origin === 'https://cdnjs.cloudflare.com',
  new StaleWhileRevalidate({
    cacheName: 'pwa-external-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 días
      }),
    ],
  })
)

// Manejo de eventos del Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

// Notificación cuando el SW está listo
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activado - PWA lista!')
  
  // Limpieza de cachés antiguos
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Eliminar cachés que no coincidan con la versión actual
          if (cacheName.includes('pwa-') && !cacheName.includes('v1')) {
            console.log('🗑️ Eliminando caché obsoleto:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Manejo de instalación
self.addEventListener('install', (event) => {
  console.log('📦 Service Worker instalado - Cacheando recursos...')
  
  // Pre-cachear recursos críticos del App Shell
  event.waitUntil(
    caches.open('pwa-app-shell-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/vite.svg'
      ])
    })
  )
  
  // Activar inmediatamente sin esperar
  self.skipWaiting()
})

// Estrategia offline fallback
self.addEventListener('fetch', (event) => {
  // Solo interceptar requests de navegación
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(async () => {
        // Si no hay red, servir la página principal desde caché
        const cachedResponse = await caches.match('/index.html')
        return cachedResponse || new Response('Offline - PWA')
      })
    )
  }
})