// 🧭 service-worker.js - Versión corregida y optimizada (JOFM)

// ✅ Importar Workbox (una sola vez)
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

if (workbox) {
  console.log('🎉 Workbox cargado correctamente');
  workbox.setConfig({ debug: false });

  // 📦 Precarga de recursos críticos
  workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/offline.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/icons/icon-72x72.png', revision: '1' },
    { url: '/icons/icon-96x96.png', revision: '1' },
    { url: '/icons/icon-128x128.png', revision: '1' },
    { url: '/icons/icon-144x144.png', revision: '1' },
    { url: '/icons/icon-152x152.png', revision: '1' },
    { url: '/icons/icon-192x192.png', revision: '1' },
    { url: '/icons/icon-384x384.png', revision: '1' },
    { url: '/icons/icon-512x512.png', revision: '1' },
    { url: '/favicon.ico', revision: '1' },
  ]);

  // 🧭 Navegación: NetworkFirst con fallback a offline.html
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: 'pages-cache',
      networkTimeoutSeconds: 3,
      plugins: [
        {
          handlerDidError: async () => {
            return caches.match('/offline.html');
          },
        },
      ],
    })
  );

  // 🧰 Recursos estáticos: CacheFirst
  workbox.routing.registerRoute(
    /\.(?:css|js|png|jpg|jpeg|svg|gif|webp|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
    })
  );

  // 🧼 Limpiar caches antiguos automáticamente
  workbox.precaching.cleanupOutdatedCaches();
} else {
  console.log('❌ Workbox no pudo cargar');
}

// 📌 Nombre fijo del cache para evitar recargas infinitas
const CACHE_NAME = 'mi-pwa-jofm-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// 🔧 INSTALACIÓN
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  event.waitUntil(self.skipWaiting());
});

// 🚀 ACTIVACIÓN
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activando...');
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== DYNAMIC_CACHE) {
            console.log('🗑️ Borrando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// 🌐 INTERCEPCIÓN de APIs personalizadas (NO manejadas por Workbox)
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\.json$/
];

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  if (NETWORK_FIRST_PATTERNS.some((pattern) => pattern.test(request.url))) {
    event.respondWith(networkFirst(request));
  }
});

// 🌐 Estrategia Network First manual (solo para APIs)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('📦 Network falló, usando cache:', request.url);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline - No hay conexión', { status: 503 });
  }
}

// 📬 Mensajes desde la app
self.addEventListener('message', (event) => {
  const { type } = event.data || {};
  if (type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// 🔔 Push notifications
self.addEventListener('push', (event) => {
  console.log('🔔 Notificación push recibida');
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(self.registration.showNotification('Mi PWA - JOFM', options));
});

console.log('✅ Service Worker cargado y listo - Mi PWA JOFM');
