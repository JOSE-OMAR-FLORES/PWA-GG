// Utilidades para debugging y testing de estrategias de cacheo

export const CacheDebug = {
  // Listar todos los cachés activos
  async listAllCaches() {
    if (!('caches' in window)) {
      console.warn('❌ Cache API no disponible');
      return [];
    }

    const names = await caches.keys();
    console.log('📦 Cachés activos:', names);

    const detailed = await Promise.all(
      names.map(async (name) => {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        return {
          name,
          entries: keys.length,
          resources: keys.map(k => k.url)
        };
      })
    );

    return detailed;
  },

  // Ver contenido específico de un caché
  async viewCacheContent(cacheName: string) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    console.log(`📋 Contenido de "${cacheName}":`, keys.length, 'recursos');
    keys.forEach((key, i) => {
      console.log(`  ${i + 1}. ${key.url}`);
    });

    return keys;
  },

  // Simular request y ver qué caché sirve
  async testRequest(url: string) {
    console.log(`\n🧪 Testeando: ${url}`);
    
    const names = await caches.keys();
    
    for (const name of names) {
      const cache = await caches.open(name);
      const response = await cache.match(url);
      
      if (response) {
        console.log(`✅ Encontrado en caché: "${name}"`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Type: ${response.type}`);
        return { cacheName: name, response };
      }
    }
    
    console.log(`❌ No encontrado en ningún caché`);
    return null;
  },

  // Estadísticas generales
  async getCacheStats() {
    const detailed = await this.listAllCaches();
    
    const stats = {
      totalCaches: detailed.length,
      totalEntries: detailed.reduce((sum, c) => sum + c.entries, 0),
      breakdown: detailed.map(c => ({
        name: c.name,
        entries: c.entries
      }))
    };

    console.log('📊 Estadísticas de caché:', stats);
    return stats;
  },

  // Limpiar un caché específico
  async clearCache(cacheName: string) {
    const deleted = await caches.delete(cacheName);
    console.log(`🗑️ Caché "${cacheName}": ${deleted ? '✅ Eliminado' : '❌ No existe'}`);
    return deleted;
  },

  // Limpiar TODO
  async clearAllCaches() {
    const names = await caches.keys();
    const results = await Promise.all(
      names.map(name => caches.delete(name))
    );
    console.log(`🗑️ Limpieza completa: ${results.filter(r => r).length}/${names.length} cachés eliminados`);
    return results;
  },

  // Simular offline y online
  async simulateNetworkChange() {
    console.log('⚠️ Simulando cambios de red...');
    
    // Esto es solo para logging, la detección real ocurre en el SW
    console.log('🔄 Para probar offline: DevTools > Network > Offline');
    console.log('🔄 Para probar 3G/Throttle: DevTools > Network > Throttling');
  },

  // Verificar si el Service Worker está activo
  async checkServiceWorkerStatus() {
    if (!('serviceWorker' in navigator)) {
      console.log('❌ Service Worker no soportado');
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    console.log('✅ Service Worker activo:', registration.scope);
    console.log('   Active Worker:', registration.active ? '✅ Sí' : '❌ No');
    console.log('   Waiting Worker:', registration.waiting ? '⏳ Sí (update pending)' : '❌ No');

    return true;
  }
};

// Crear versión simplificada para usar en consola
(window as any).cacheDebug = CacheDebug;

console.log('🛠️ Cache Debug disponible en: window.cacheDebug');