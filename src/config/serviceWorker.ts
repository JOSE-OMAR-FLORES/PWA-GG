// Service Worker Configuration
// Este archivo documenta las estrategias de cacheo implementadas

export const SW_CONFIG = {
  // Versión del Service Worker
  version: '1.0.0',
  
  // Estrategias de Cacheo
  cacheStrategies: {
    // App Shell - Cache First
    // La estructura básica de la app siempre desde cache
    appShell: {
      strategy: 'CacheFirst',
      cacheName: 'pwa-app-shell-v1',
      resources: [
        '/',
        '/index.html',
        '/manifest.json',
        '/vite.svg'
      ],
      expiration: 'No expira (crítico)'
    },

    // Imágenes - Cache First con expiración
    images: {
      strategy: 'CacheFirst', 
      cacheName: 'pwa-images',
      pattern: 'request.destination === "image"',
      expiration: '30 días',
      maxEntries: 60
    },

    // CSS y JavaScript - Stale While Revalidate
    // Sirve desde cache pero actualiza en segundo plano
    static: {
      strategy: 'StaleWhileRevalidate',
      cacheName: 'pwa-static-resources', 
      pattern: 'CSS y JavaScript',
      expiration: '7 días',
      maxEntries: 50
    },

    // Fuentes - Cache First (raramente cambian)
    fonts: {
      strategy: 'CacheFirst',
      cacheName: 'pwa-fonts',
      pattern: 'request.destination === "font"',
      expiration: '1 año', 
      maxEntries: 10
    },

    // API Calls - Network First con cache de respaldo
    // Prioriza datos frescos, fallback a cache
    api: {
      strategy: 'NetworkFirst',
      cacheName: 'pwa-api-cache',
      pattern: 'url.pathname.startsWith("/api/")',
      expiration: '5 minutos',
      maxEntries: 100
    },

    // Recursos Externos - Stale While Revalidate
    external: {
      strategy: 'StaleWhileRevalidate', 
      cacheName: 'pwa-external-resources',
      pattern: 'Google Fonts, CDNs externos',
      expiration: '30 días',
      maxEntries: 30
    }
  },

  // Funcionalidades Offline
  offlineFeatures: {
    navigation: 'Fallback a index.html',
    assets: 'Servidos desde cache',
    api: 'Respuestas cacheadas cuando disponibles',
    notifications: 'Service Worker maneja notificaciones push'
  },

  // Eventos del Service Worker
  events: {
    install: 'Pre-cache recursos críticos del App Shell',
    activate: 'Limpia cachés obsoletos y toma control',
    fetch: 'Intercepta requests y aplica estrategias',
    message: 'Maneja comandos (SKIP_WAITING, etc.)'
  }
}

// Utilidades para debugging
export const SW_UTILS = {
  // Verificar si SW está soportado
  isSupported: () => 'serviceWorker' in navigator,
  
  // Obtener información del SW activo
  getActiveServiceWorker: async () => {
    if (!SW_UTILS.isSupported()) return null
    const registration = await navigator.serviceWorker.ready
    return registration.active
  },
  
  // Listar todos los cachés
  listCaches: async () => {
    if (!('caches' in window)) return []
    return await caches.keys()
  },
  
  // Obtener tamaño total del cache
  getCacheSize: async () => {
    if (!('caches' in window)) return 0
    const cacheNames = await caches.keys()
    let totalSize = 0
    
    for (const name of cacheNames) {
      const cache = await caches.open(name)
      const keys = await cache.keys()
      totalSize += keys.length
    }
    
    return totalSize
  }
}

export default SW_CONFIG