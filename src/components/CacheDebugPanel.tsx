import React, { useState } from 'react';
import { CacheDebug } from '../utils/cacheDebug';
import './CacheDebugPanel.css';

interface CacheInfo {
  name: string;
  entries: number;
}

export const CacheDebugPanel: React.FC = () => {
  const [cacheStats, setCacheStats] = useState<CacheInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleRefreshStats = async () => {
    setIsLoading(true);
    const stats = await CacheDebug.getCacheStats();
    setCacheStats(stats.breakdown);
    addLog('✅ Estadísticas refrescadas');
    setIsLoading(false);
  };

  const handleClearAllCaches = async () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar TODO el caché?')) {
      setIsLoading(true);
      await CacheDebug.clearAllCaches();
      await handleRefreshStats();
      addLog('🗑️ Todos los cachés limpiados');
      setIsLoading(false);
    }
  };

  const handleTestCacheFirst = async () => {
    setIsLoading(true);
    addLog('🧪 Testeando Cache First (index.html)...');
    const result = await CacheDebug.testRequest(`${window.location.origin}/index.html`);
    if (result) {
      addLog(`✅ Encontrado en: ${result.cacheName}`);
    } else {
      addLog('❌ No está en caché');
    }
    setIsLoading(false);
  };

  const handleTestNetworkFirst = async () => {
    setIsLoading(true);
    addLog('🧪 Testeando Network First (API simulado)...');
    const result = await CacheDebug.testRequest(`${window.location.origin}/api/user`);
    if (result) {
      addLog(`✅ Encontrado en: ${result.cacheName}`);
    } else {
      addLog('❌ No está en caché (esperado para API fresh)');
    }
    setIsLoading(false);
  };

  const handleCheckSW = async () => {
    setIsLoading(true);
    addLog('🔍 Verificando Service Worker...');
    const active = await CacheDebug.checkServiceWorkerStatus();
    addLog(active ? '✅ SW activo' : '❌ SW inactivo');
    setIsLoading(false);
  };

  return (
    <div className="cache-debug-panel">
      <div className="debug-header">
        <h3>🛠️ Cache Debug Panel</h3>
        <p>Herramienta de testing para estrategias de cacheo</p>
      </div>

      {/* Statistics */}
      <div className="debug-section">
        <h4>📊 Estadísticas de Caché</h4>
        <div className="cache-list">
          {cacheStats.length > 0 ? (
            cacheStats.map((cache, idx) => (
              <div key={idx} className="cache-item">
                <span className="cache-name">{cache.name}</span>
                <span className="cache-entries">{cache.entries} recursos</span>
              </div>
            ))
          ) : (
            <p className="no-data">Haz clic en "Refrescar Estadísticas" para ver datos</p>
          )}
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleRefreshStats}
          disabled={isLoading}
        >
          🔄 Refrescar Estadísticas
        </button>
      </div>

      {/* Test Buttons */}
      <div className="debug-section">
        <h4>🧪 Tests de Estrategias</h4>
        <div className="button-grid">
          <button 
            className="btn btn-secondary"
            onClick={handleTestCacheFirst}
            disabled={isLoading}
            title="Prueba Cache First: app shell debe estar en caché"
          >
            🏠 Test Cache First
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleTestNetworkFirst}
            disabled={isLoading}
            title="Prueba Network First: API data"
          >
            🌐 Test Network First
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleCheckSW}
            disabled={isLoading}
            title="Verifica si el Service Worker está activo"
          >
            🔍 Verificar SW
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="debug-section">
        <h4>⚙️ Acciones</h4>
        <button 
          className="btn btn-danger"
          onClick={handleClearAllCaches}
          disabled={isLoading}
        >
          🗑️ Limpiar TODO Caché
        </button>
      </div>

      {/* Logs */}
      <div className="debug-section">
        <h4>📋 Logs ({logs.length})</h4>
        <div className="logs-container">
          {logs.map((log, idx) => (
            <div key={idx} className="log-line">
              {log}
            </div>
          ))}
          {logs.length === 0 && (
            <p className="no-logs">Los logs aparecerán aquí...</p>
          )}
        </div>
        {logs.length > 0 && (
          <button 
            className="btn btn-small"
            onClick={() => setLogs([])}
          >
            Limpiar Logs
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="debug-section debug-instructions">
        <h4>📖 Cómo Usar</h4>
        <ul>
          <li><strong>Refrescar Estadísticas:</strong> Ver qué hay en cada caché</li>
          <li><strong>Tests:</strong> Verificar si recursos están cacheados</li>
          <li><strong>Offline Mode:</strong> DevTools → Network → Throttle: Offline</li>
          <li><strong>Slow 3G:</strong> DevTools → Network → Throttle: Slow 3G</li>
          <li><strong>Consola:</strong> Usa <code>window.cacheDebug</code> para más funciones</li>
        </ul>
      </div>
    </div>
  );
};

export default CacheDebugPanel;