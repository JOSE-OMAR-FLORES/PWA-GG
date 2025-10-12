// service-worker.js - Service Worker personalizado para Mi PWA - JOFM
// Importar Workbox usando importScripts
importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.3.0/workbox-sw.js');

if (workbox) {
  console.log('🎉 Workbox cargado correctamente');
  
  // Configurar Workbox
  workbox.setConfig({
    debug: true
  });

  // Precache manual de recursos críticos (sin __WB_MANIFEST)
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
    { url: '/index.html', revision: null },
    { url: '/offline.html', revision: null },
    { url: '/manifest.json', revision: null },
    { url: '/icons/icon-72x72.png', revision: null },
    { url: '/icons/icon-96x96.png', revision: null },
    { url: '/icons/icon-128x128.png', revision: null },
    { url: '/icons/icon-144x144.png', revision: null },
    { url: '/icons/icon-152x152.png', revision: null },
    { url: '/icons/icon-192x192.png', revision: null },
    { url: '/icons/icon-384x384.png', revision: null },
    { url: '/icons/icon-512x512.png', revision: null },
    { url: '/favicon.ico', revision: null },
  ]);
  
  // Configurar navegación con fallback a offline.html
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
  
  // Configurar estrategia para recursos estáticos
  workbox.routing.registerRoute(
    /\.(?:css|js|png|jpg|jpeg|svg|gif|webp|ico)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'static-resources',
    })
  );
  
  // Limpiar caches antiguos automáticamente
  workbox.precaching.cleanupOutdatedCaches();
} else {
  console.log('❌ Workbox no pudo cargar');
}

// Versión del cache - incrementar para forzar actualizaciones
const CACHE_NAME = 'mi-pwa-jofm-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Recursos críticos que siempre deben estar en cache (App Shell)
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/manifest.webmanifest',
  '/offline.html',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/favicon.ico'
];

// URLs que requieren estrategia Network First
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\.json$/
];

// URLs que requieren estrategia Cache First  
const CACHE_FIRST_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
  /\.(?:css|js)$/,
  /fonts\./
];

// 🚀 INSTALACIÓN - Workbox maneja el precache automáticamente
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    Promise.resolve()
      .then(() => {
        console.log('✅ Service Worker: Workbox maneja el precache automáticamente');
        return self.skipWaiting(); // Activar inmediatamente
      })
      .catch((error) => {
        console.error('❌ Service Worker: Error durante la instalación:', error);
      })
  );
});

// 🔄 ACTIVACIÓN - Limpiar caches antiguos
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Eliminar caches que no sean de la versión actual
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('🗑️ Service Worker: Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activado y tomando control');
        return self.clients.claim(); // Tomar control inmediatamente
      })
  );
});

// 🌐 INTERCEPCIÓN DE REQUESTS - Solo para APIs no manejadas por Workbox
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  // Solo manejar requests GET
  if (method !== 'GET') return;

  // Ignorar requests de extensiones del navegador
  if (url.includes('extension') || url.includes('chrome-')) return;

  // Solo manejar APIs específicas que Workbox no cubre
  if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url))) {
    console.log('🔍 Service Worker: Interceptando API:', url);
    event.respondWith(networkFirst(request));
  }
  // Dejar todo lo demás para Workbox (navegación, recursos estáticos, etc.)
});

// 📦 Estrategia Cache First
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('✅ Cache HIT:', request.url);
      return cachedResponse;
    }

    console.log('⬇️ Cache MISS, fetching:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache First error:', error);
    return new Response('Offline - Recurso no disponible', { 
      status: 503,
      statusText: 'Service Unavailable' 
    });
  }
}

// 🌐 Estrategia Network First
async function networkFirst(request) {
  try {
    console.log('🌐 Network First:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('📦 Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response('Offline - Datos no disponibles', { 
      status: 503,
      statusText: 'Service Unavailable' 
    });
  }
}

// 🔄 Estrategia Stale While Revalidate
async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await caches.match(request);

  // Fetch en background para actualizar cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);

  // Retornar cache inmediatamente si existe, sino esperar network
  return cachedResponse || fetchPromise;
}

// 🏠 Cache First con fallback para navegación (CRITICAL para offline desde cero)
async function cacheFirstWithFallback(request) {
  try {
    // Buscar en cache primero
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('✅ Navigation Cache HIT:', request.url);
      return cachedResponse;
    }

    // Si no está en cache, buscar index.html como fallback
    const indexResponse = await caches.match('/index.html');
    if (indexResponse) {
      console.log('🏠 Using cached index.html as fallback for:', request.url);
      return indexResponse;
    }

    // Si tampoco está index.html, intentar network
    console.log('⬇️ Navigation Cache MISS, trying network:', request.url);
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('❌ Navigation failed, using index.html fallback:', error);
    
    // Último recurso: intentar servir index.html desde cache
    const indexFallback = await caches.match('/index.html');
    if (indexFallback) {
      return indexFallback;
    }
    
    return new Response('PWA Offline - No hay conexión', { 
      status: 503,
      statusText: 'Service Unavailable',
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

// 📬 Manejo de mensajes desde la aplicación
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;

  switch (type) {
    case 'SKIP_WAITING':
      console.log('⏩ Service Worker: Saltando espera...');
      self.skipWaiting();
      break;
      
    case 'CACHE_INFO':
      getCacheInfo().then((info) => {
        event.ports[0].postMessage({ type: 'CACHE_INFO_RESPONSE', payload: info });
      });
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches().then((result) => {
        event.ports[0].postMessage({ type: 'CLEAR_CACHE_RESPONSE', payload: result });
      });
      break;
      
    default:
      console.log('📨 Service Worker: Mensaje no reconocido:', type);
  }
});

// 📊 Obtener información del cache
async function getCacheInfo() {
  try {
    const cacheNames = await caches.keys();
    const cacheInfo = {};
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const keys = await cache.keys();
      cacheInfo[cacheName] = keys.length;
    }
    
    return {
      caches: cacheInfo,
      totalCaches: cacheNames.length,
      totalResources: Object.values(cacheInfo).reduce((a, b) => a + b, 0)
    };
  } catch (error) {
    console.error('❌ Error obteniendo info del cache:', error);
    return null;
  }
}

// 🗑️ Limpiar todos los caches
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    const deletePromises = cacheNames.map(name => caches.delete(name));
    const results = await Promise.all(deletePromises);
    
    console.log('🧹 Todos los caches limpiados');
    return {
      success: true,
      deletedCaches: results.filter(r => r).length,
      totalCaches: cacheNames.length
    };
  } catch (error) {
    console.error('❌ Error limpiando caches:', error);
    return { success: false, error: error.message };
  }
}

// 🔔 Sincronización en background (para futuras funcionalidades)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Service Worker: Sincronización en background');
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Aquí puedes agregar lógica de sincronización
  console.log('📡 Ejecutando sincronización en background...');
}

// 🔔 Push notifications (para futuras funcionalidades)
self.addEventListener('push', (event) => {
  console.log('🔔 Service Worker: Push notification recibida');
  
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

  event.waitUntil(
    self.registration.showNotification('Mi PWA - JOFM', options)
  );
});

console.log('🎉 Service Worker cargado exitosamente - Mi PWA JOFM');