import React from 'react'
import { useServiceWorker, useCacheInfo } from '../hooks/useServiceWorker'
import './ServiceWorkerInfo.css'

export const ServiceWorkerInfo: React.FC = () => {
  const { updateAvailable, updateServiceWorker, isOnline, swStatus } = useServiceWorker()
  const { cacheSize, cacheNames, getCacheInfo, clearCache } = useCacheInfo()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return '✅'
      case 'loading': return '🔄'
      case 'error': return '❌'
      default: return '⏳'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ready': return 'Activo y funcionando'
      case 'loading': return 'Cargando...'
      case 'error': return 'Error en el registro'
      default: return 'Desconocido'
    }
  }

  return (
    <div className="sw-info">
      <h3>🔧 Service Worker Status</h3>
      
      {/* Estado del Service Worker */}
      <div className="sw-status">
        <div className="status-item">
          <span className="status-icon">{getStatusIcon(swStatus)}</span>
          <span>Estado: {getStatusText(swStatus)}</span>
        </div>
        
        <div className="status-item">
          <span className="status-icon">{isOnline ? '🌐' : '📴'}</span>
          <span>Conexión: {isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      {/* Actualización disponible */}
      {updateAvailable && (
        <div className="update-banner">
          <div className="update-content">
            <span className="update-icon">🆕</span>
            <div className="update-text">
              <strong>¡Actualización disponible!</strong>
              <p>Nueva versión de la PWA lista para instalar</p>
            </div>
            <button 
              className="update-button"
              onClick={updateServiceWorker}
            >
              Actualizar
            </button>
          </div>
        </div>
      )}

      {/* Información del Cache */}
      <div className="cache-info">
        <h4>💾 Información del Cache</h4>
        <div className="cache-stats">
          <div className="cache-stat">
            <span className="cache-number">{cacheSize}</span>
            <span className="cache-label">Recursos Cacheados</span>
          </div>
          <div className="cache-stat">
            <span className="cache-number">{cacheNames.length}</span>
            <span className="cache-label">Cachés Activos</span>
          </div>
        </div>
        
        {cacheNames.length > 0 && (
          <div className="cache-details">
            <h5>Cachés Disponibles:</h5>
            <ul className="cache-list">
              {cacheNames.map((name, index) => (
                <li key={index} className="cache-item">
                  <code>{name}</code>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="cache-actions">
          <button 
            className="cache-button refresh" 
            onClick={getCacheInfo}
          >
            🔄 Actualizar Info
          </button>
          <button 
            className="cache-button clear" 
            onClick={clearCache}
          >
            🗑️ Limpiar Cache
          </button>
        </div>
      </div>

      {/* Estrategias de Cacheo */}
      <div className="cache-strategies">
        <h4>📋 Estrategias de Cacheo</h4>
        <div className="strategy-list">
          <div className="strategy-item">
            <span className="strategy-icon">🏠</span>
            <div>
              <strong>App Shell</strong>
              <p>Cache First - Estructura base siempre disponible</p>
            </div>
          </div>
          
          <div className="strategy-item">
            <span className="strategy-icon">🖼️</span>
            <div>
              <strong>Imágenes</strong>
              <p>Cache First - 30 días de expiración</p>
            </div>
          </div>
          
          <div className="strategy-item">
            <span className="strategy-icon">📄</span>
            <div>
              <strong>CSS/JS</strong>
              <p>Stale While Revalidate - Actualización en segundo plano</p>
            </div>
          </div>
          
          <div className="strategy-item">
            <span className="strategy-icon">🌐</span>
            <div>
              <strong>API</strong>
              <p>Network First - Datos frescos cuando hay conexión</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceWorkerInfo