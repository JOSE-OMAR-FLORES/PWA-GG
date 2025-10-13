import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🎯 [MAIN] React iniciando...');

// El Service Worker ya fue registrado en index.html
// Aquí solo manejamos la lógica de actualización

if ('serviceWorker' in navigator) {
  // Escuchar evento de actualización disponible
  window.addEventListener('swUpdateAvailable', () => {
    console.log('🆕 [MAIN] Actualización disponible');
    // La app puede mostrar un banner si es necesario
  });

  // Manejar cuando el nuevo SW toma control
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      console.log('♻️ [MAIN] Recargando página con nuevo SW...');
      window.location.reload();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('✅ [MAIN] React cargado exitosamente');