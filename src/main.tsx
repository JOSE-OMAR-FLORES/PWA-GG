import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Registro ultra-robsto de Service Worker para PWA offline
if ('serviceWorker' in navigator) {
  // Registro inmediato sin esperar 'load'
  navigator.serviceWorker.register('/sw.js', { 
    scope: '/',
    updateViaCache: 'none' // Forzar actualización sin cache
  })
    .then(registration => {
      console.log('🎉 Service Worker ultra-robusto registrado:', registration.scope);
      
      // Forzar activación inmediata si hay un SW en espera
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      
      // Escuchar updates del SW
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('🔄 Nueva versión del SW disponible, recargando...');
              window.location.reload();
            }
          });
        }
      });
    })
    .catch(error => {
      console.error('❌ Error registrando Service Worker:', error);
    });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
