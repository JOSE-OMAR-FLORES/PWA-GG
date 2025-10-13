// Configuración centralizada de estrategias de cacheo

export const CACHE_CONFIG = {
  version: 'v2.0.0',
  
  // App Shell - Cache First
  appShell: {
    strategy: 'cache-first',
    cacheName: 'pwa-app-shell-v2.0.0',
    description: 'Estructura base de la app (HTML, CSS, JS)',
    ttl: null, // No expira (crítico)
    maxSize: 50 // MB
  },

  // Imágenes y datos no críticos - Stale While Revalidate
  images: {
    strategy: 'stale-while-revalidate',
    cacheName: 'pwa-images-v2.0.0',
    description: 'Imágenes y recursos no críticos',
    ttl: 2592000000, // 30 días en ms
    maxEntries: 60,
    fileTypes: ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico']
  },

  // Datos dinámicos - Stale While Revalidate
  staleData: {
    strategy: 'stale-while-revalidate',
    cacheName: 'pwa-stale-v2.0.0',
    description: 'Datos no críticos que pueden ser un poco antiguos',
    ttl: 604800000, // 7 días
    maxEntries: 50,
    paths: ['/api/posts', '/api/comments']
  },

  // API Data - Network First
  networkFirst: {
    strategy: 'network-first',
    cacheName: 'pwa-network-v2.0.0',
    description: 'Datos que requieren ser frescos',
    ttl: 300000, // 5 minutos
    maxEntries: 100,
    paths: ['/api/user', '/api/settings', '/search']
  }
};

export const RESOURCE_PATTERNS = {
  staticAssets: [
    /\.html$/,
    /\.css$/,
    /\.js$/,
    /manifest\.json$/,
    /favicon/,
    /\.svg$/
  ],
  
  images: [
    /\.png$/,
    /\.jpg$/,
    /\.jpeg$/,
    /\.gif$/,
    /\.webp$/,
    /\.ico$/
  ],
  
  apiNonCritical: [
    /\/api\/posts/,
    /\/api\/comments/,
    /\/api\/suggestions/
  ],
  
  apiNetworkFirst: [
    /\/api\/user/,
    /\/api\/settings/,
    /\/search/,
    /\/api\/profile/
  ]
};

export function classifyRequest(url: string): string {
  const urlObj = new URL(url);
  const pathname = urlObj.pathname;

  if (RESOURCE_PATTERNS.staticAssets.some(pattern => pattern.test(pathname))) {
    return 'cache-first';
  }

  if (RESOURCE_PATTERNS.images.some(pattern => pattern.test(pathname))) {
    return 'stale-while-revalidate';
  }

  if (RESOURCE_PATTERNS.apiNonCritical.some(pattern => pattern.test(pathname))) {
    return 'stale-while-revalidate';
  }

  if (RESOURCE_PATTERNS.apiNetworkFirst.some(pattern => pattern.test(pathname))) {
    return 'network-first';
  }

  return 'network-first'; // Fallback
}