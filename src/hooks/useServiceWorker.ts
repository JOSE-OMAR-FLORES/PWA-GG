import { useEffect, useState } from 'react'

interface ServiceWorkerUpdateState {
  updateAvailable: boolean
  registration: ServiceWorkerRegistration | null
}

export const useServiceWorker = () => {
  const [updateState, setUpdateState] = useState<ServiceWorkerUpdateState>({
    updateAvailable: false,
    registration: null
  })
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [swStatus, setSwStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    // Registrar Service Worker si está disponible
    if ('serviceWorker' in navigator) {
      registerServiceWorker()
    } else {
      setSwStatus('error')
      console.warn('Service Worker no está soportado en este navegador')
    }

    // Listeners para estado de conexión
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

 const registerServiceWorker = async () => {
  try {
    console.log('🔄 [HOOK] Verificando registro de Service Worker...')
    setSwStatus('loading')
    
    // El SW ya fue registrado en index.html
    // Solo verificamos que esté ready
    const registration = await navigator.serviceWorker.ready
    
    console.log('✅ [HOOK] Service Worker ya estaba registrado:', registration.scope)
    
    if (registration.waiting) {
      console.log('📦 [HOOK] Hay actualización pendiente')
      setUpdateState({
        updateAvailable: true,
        registration
      })
    }

    if (registration) {
      console.log('✅ [HOOK] Service Worker verificado exitosamente')
      setSwStatus('ready')
    }

  } catch (error) {
    console.error('❌ [HOOK] Error verificando Service Worker:', error)
    setSwStatus('error')
  }
}

  const updateServiceWorker = () => {
    if (updateState.registration) {
      // Enviar mensaje para activar el nuevo SW
      if (updateState.registration.waiting) {
        updateState.registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      }
    }
  }

  return {
    updateAvailable: updateState.updateAvailable,
    updateServiceWorker,
    isOnline,
    swStatus
  }
}

// Hook para información del cache
export const useCacheInfo = () => {
  const [cacheSize, setCacheSize] = useState<number>(0)
  const [cacheNames, setCacheNames] = useState<string[]>([])

  const getCacheInfo = async () => {
    console.log('🔄 Actualizando información del cache...')
    if ('caches' in window) {
      try {
        const names = await caches.keys()
        console.log('📦 Cachés encontrados:', names)
        setCacheNames(names)
        
        let totalSize = 0
        for (const name of names) {
          const cache = await caches.open(name)
          const keys = await cache.keys()
          totalSize += keys.length
          console.log(`📊 Cache "${name}": ${keys.length} recursos`)
        }
        setCacheSize(totalSize)
        console.log('✅ Información del cache actualizada:', { totalSize, cachesCount: names.length })
      } catch (error) {
        console.error('❌ Error obteniendo información del cache:', error)
      }
    } else {
      console.warn('⚠️ Cache API no disponible')
    }
  }

  const clearCache = async () => {
    console.log('🗑️ Iniciando limpieza de cache...')
    if ('caches' in window) {
      try {
        const names = await caches.keys()
        console.log('🗂️ Cachés a eliminar:', names)
        
        const results = await Promise.all(
          names.map(async (name) => {
            const deleted = await caches.delete(name)
            console.log(`${deleted ? '✅' : '❌'} Cache "${name}": ${deleted ? 'eliminado' : 'no se pudo eliminar'}`)
            return deleted
          })
        )
        
        setCacheSize(0)
        setCacheNames([])
        
        const deletedCount = results.filter(r => r).length
        console.log(`🎉 Limpieza completada: ${deletedCount}/${names.length} cachés eliminados`)
        
        // Mostrar alerta al usuario
        alert(`✅ Cache limpiado exitosamente!\n${deletedCount} cachés eliminados`)
        
        // Actualizar información después de limpiar
        setTimeout(() => getCacheInfo(), 1000)
        
      } catch (error) {
        console.error('❌ Error limpiando cache:', error)
        alert('❌ Error al limpiar el cache. Ver consola para detalles.')
      }
    } else {
      console.warn('⚠️ Cache API no disponible')
      alert('⚠️ Cache API no disponible en este navegador')
    }
  }

  useEffect(() => {
    getCacheInfo()
  }, [])

  return {
    cacheSize,
    cacheNames,
    getCacheInfo,
    clearCache
  }
}