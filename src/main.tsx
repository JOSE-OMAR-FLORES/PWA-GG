import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('🎯 [MAIN] React iniciando...');

// El Service Worker principal ya fue registrado en index.html
// Solo registramos Firebase Messaging SW aquí
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Firebase Messaging SW registrado:', registration);
    })
    .catch((error) => {
      console.error('❌ Error registrando Firebase Messaging SW:', error);
    });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

console.log('✅ [MAIN] React cargado exitosamente');