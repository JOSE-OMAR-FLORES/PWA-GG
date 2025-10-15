// ===============================
// 🚀 SERVICE WORKER AVANZADO CON ESTRATEGIAS DE CACHEO
// ===============================

const VERSION = 'v2.0.0';
const CACHE_APP_SHELL = `pwa-app-shell-${VERSION}`;
const CACHE_IMAGES = `pwa-images-${VERSION}`;
const CACHE_STALE = `pwa-stale-${VERSION}`;
const CACHE_NETWORK = `pwa-network-${VERSION}`;

// ===== RECURSOS POR CATEGORÍA =====
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-150x150.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png'
];

const CSS_JS_ASSETS = [
  // Agregar rutas de CSS y JS aquí cuando sea necesario
  // Ejemplo: '/styles/main.css', '/scripts/app.js'
];

// ===============================
// 📦 INSTALACIÓN
// ===============================
self.addEventListener('install', event => {
  console.log('[SW v2] 📦 Instalando service worker...');
  event.waitUntil(
    Promise.all([
      // Cache App Shell (Cache First)
      caches.open(CACHE_APP_SHELL).then(cache => {
        console.log('[SW] ✅ App Shell cacheado');
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache para imágenes vacío (se llena durante runtime)
      caches.open(CACHE_IMAGES),
      // Cache para datos dinámicos vacío
      caches.open(CACHE_STALE),
      caches.open(CACHE_NETWORK)
    ])
  );
  // NO usar skipWaiting aquí para evitar recargas infinitas
  // self.skipWaiting();
});

// ===============================
// 🧹 ACTIVACIÓN
// ===============================
self.addEventListener('activate', event => {
  console.log('[SW v2] 🧹 Activando service worker...');
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          // Eliminar cachés antiguos que no sean v2
          if (!key.includes(VERSION)) {
            console.log('[SW] 🗑️ Borrando caché viejo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ===============================
// 🌐 INTERCEPTAR SOLICITUDES
// ===============================
self.addEventListener('fetch', event => {
  const { request } = event;
  const { url } = request;

  // Solo interceptar GET
  if (request.method !== 'GET') return;

  // ===== ESTRATEGIA 1: CACHE FIRST (App Shell) =====
  if (isStaticAsset(url)) {
    console.log(`[SW] 🏠 Cache First: ${url}`);
    event.respondWith(
      caches.match(request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch(request).then(networkResponse => {
            // Actualizar cache en background
            return caches.open(CACHE_APP_SHELL).then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
        .catch(() => {
          // Fallback a offline.html para documentos
          if (request.destination === 'document') {
            return caches.match('/offline.html') || 
                   new Response('Offline - recurso no disponible');
          }
        })
    );
    return;
  }

  // ===== ESTRATEGIA 2: STALE WHILE REVALIDATE (Imágenes, no críticos) =====
  if (isImageOrNonCritical(url)) {
    console.log(`[SW] 🖼️ Stale-While-Revalidate: ${url}`);
    event.respondWith(
      caches.open(CACHE_STALE).then(cache => {
        return cache.match(request).then(cachedResponse => {
          // Retornar cache inmediatamente si existe
          const fetchPromise = fetch(request).then(networkResponse => {
            // Actualizar cache en background
            if (networkResponse && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            console.log('[SW] ⚠️ No hay conexión y no hay cache para:', url);
            return null;
          });

          // Retornar cached o el resultado de la red
          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // ===== ESTRATEGIA 3: NETWORK FIRST (Datos frescos requeridos) =====
  if (isNetworkFirst(url)) {
    console.log(`[SW] 🌐 Network First: ${url}`);
    event.respondWith(
      fetch(request)
        .then(networkResponse => {
          // Cachear la respuesta si es válida
          if (networkResponse && networkResponse.status === 200) {
            return caches.open(CACHE_NETWORK).then(cache => {
              cache.put(request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Si no hay red, intentar caché
          console.log('[SW] 📡 Sin conexión, usando cache para:', url);
          return caches.match(request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // Último recurso: página offline
            if (request.destination === 'document') {
              return caches.match('/offline.html') ||
                     new Response('Offline - datos no disponibles');
            }
            return new Response('Recurso no disponible offline', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
        })
    );
    return;
  }

  // ===== FALLBACK GENÉRICO =====
  event.respondWith(
    fetch(request)
      .then(response => {
        // Si es 404 del servidor, servir 404.html
        if (response.status === 404 && request.destination === 'document') {
          return caches.match('/404.html') || response;
        }
        return response;
      })
      .catch(() => {
        if (request.destination === 'document') {
          // Si la petición es a / o /index.html, servir el cache de la app
          if (request.url.endsWith('/') || request.url.endsWith('/index.html')) {
            return caches.match('/') || caches.match('/index.html');
          }
          // Para otros documentos, mostrar offline.html
          console.log('[SW] 📴 Sin conexión, mostrando offline.html');
          return caches.match('/offline.html') ||
                 new Response('Offline');
        }
        return caches.match(request) ||
               new Response('Recurso no disponible', { status: 503 });
      })
  );
});

// ===============================
// 🔍 FUNCIONES DE CLASIFICACIÓN
// ===============================

function isStaticAsset(url) {
  // App Shell: HTML, CSS, JS, SVG
  // PERO excluir 404.html y offline.html
  if (url.includes('/404.html') || url.includes('/offline.html')) {
    return false;
  }
  
  return url.includes('.html') ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('/manifest.json') ||
         url.includes('/favicon') ||
         url.includes('.svg') ||
         url === self.location.origin + '/' ||
         isInList(url, STATIC_ASSETS);
}

function isImageOrNonCritical(url) {
  // Imágenes y recursos no críticos
  return url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.gif') ||
         url.includes('.webp') ||
         url.includes('.ico') ||
         url.includes('/api/posts') ||  // Ejemplo: datos no críticos
         url.includes('/api/comments');  // Ejemplo: datos no críticos
}

function isNetworkFirst(url) {
  // Datos que requieren frescura
  return url.includes('/api/') && !isImageOrNonCritical(url) ||
         url.includes('/search') ||
         url.includes('/user/profile');
}

function isInList(url, list) {
  return list.some(item => url.endsWith(item) || url === item);
}

// ===============================
// 🔔 MANEJO DE ACTUALIZACIONES MANUAL
// ===============================
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] ⚡ Activando actualización...');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('[SW] 🗑️ Limpiando caches...');
    caches.keys().then(keys => {
      Promise.all(keys.map(key => caches.delete(key)));
    });
  }
});

// ===============================
// 📊 LOGGING PARA DEBUGGING
// ===============================
console.log(`[SW v2] ✅ Service Worker v${VERSION} cargado`);
console.log('[SW] Estrategias activas:');
console.log('[SW] 🏠 Cache First: App Shell (HTML, CSS, JS)');
console.log('[SW] 🖼️ Stale-While-Revalidate: Imágenes y datos no críticos');
console.log('[SW] 🌐 Network First: Datos que requieren frescura');