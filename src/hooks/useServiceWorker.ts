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
      console.log('🔄 Registrando Service Worker personalizado...')
      setSwStatus('loading')
      
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      })
      
      console.log('✅ Service Worker registrado:', registration.scope)
      
      // Manejar actualizaciones
      registration.addEventListener('updatefound', () => {
        console.log('🔄 Nueva versión del Service Worker encontrada')
        const newWorker = registration.installing
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('📦 Nueva versión instalada, actualización disponible')
              setUpdateState({
                updateAvailable: true,
                registration
              })
            }
          })
        }
      })
      
      // Escuchar cuando el SW toma control
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('🚀 Service Worker tomó control, recargando página...')
        window.location.reload()
      })
      
      if (registration) {
        console.log('✅ Service Worker registrado exitosamente')
        setSwStatus('ready')
      }

    } catch (error) {
      console.error('❌ Error registrando Service Worker:', error)
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