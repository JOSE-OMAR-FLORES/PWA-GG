import React from 'react';
import './PWAInfo.css';

interface PWAInfoProps {
  className?: string;
}

export const PWAInfo: React.FC<PWAInfoProps> = ({ className = '' }) => {
  const [isInstallable, setIsInstallable] = React.useState(false);
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null);

  React.useEffect(() => {
    // Función para verificar instalabilidad
    const checkInstallability = () => {
      // Método 1: Verificar si ya está instalada
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      const isInstalled = (window.navigator as any).standalone || isStandalone;
      
      // Método 2: Verificar criterios PWA básicos
      const hasManifest = document.querySelector('link[rel="manifest"]');
      const hasServiceWorker = 'serviceWorker' in navigator;
      const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
      
      // Si no está instalada y cumple criterios básicos, es instalable
      if (!isInstalled && hasManifest && hasServiceWorker && isSecure) {
        setIsInstallable(true);
      }
    };

    // Detectar si la PWA es instalable via beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('🎯 Evento beforeinstallprompt detectado');
      // Prevenir que Chrome 67 y anteriores muestren automáticamente el prompt
      e.preventDefault();
      // Guardar el evento para poder mostrarlo más tarde
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    // Verificar inmediatamente
    checkInstallability();

    // Escuchar el evento
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // También verificar después de que el service worker esté listo
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setTimeout(checkInstallability, 1000);
      });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      console.log('🚀 Instalando via deferredPrompt');
      // Mostrar el prompt de instalación
      deferredPrompt.prompt();

      // Esperar a que el usuario responda al prompt
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('✅ Usuario aceptó instalar la PWA');
      } else {
        console.log('❌ Usuario rechazó instalar la PWA');
      }

      // Limpiar el deferredPrompt ya que solo se puede usar una vez
      setDeferredPrompt(null);
      setIsInstallable(false);
    } else {
      // Si no hay deferredPrompt, dar instrucciones manuales
      console.log('💡 Guiando instalación manual');
      const isChrome = /Chrome/.test(navigator.userAgent);
      const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      
      let message = '';
      if (isChrome) {
        message = 'Para instalar:\n1. Haz clic en "Abrir en la app" en la barra de direcciones\n2. O usa el menú ⋮ > "Instalar Mi PWA - JOFM"';
      } else if (isSafari) {
        message = 'Para instalar en Safari:\n1. Toca el botón Compartir 📤\n2. Selecciona "Agregar a la pantalla de inicio"';
      } else {
        message = 'Para instalar:\nBusca la opción "Instalar" en el menú de tu navegador';
      }
      
      alert(message);
    }
  };

  const isPWA = () => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone ||
           document.referrer.includes('android-app://');
  };

  return (
    <div className={`pwa-info ${className}`}>
      <div className="pwa-status">
        <h3>🚀 PWA Status</h3>
        <div className="status-items">
          <div className="status-item">
            <span className={`status-indicator ${isPWA() ? 'active' : 'inactive'}`}></span>
            <span>Ejecutándose como PWA: {isPWA() ? 'Sí' : 'No'}</span>
          </div>
          
          <div className="status-item">
            <span className={`status-indicator ${isInstallable ? 'active' : 'inactive'}`}></span>
            <span>Instalable: {isInstallable ? 'Sí' : 'No disponible'}</span>
          </div>

          {isInstallable && (
            <button 
              onClick={handleInstallClick}
              className="install-button"
              aria-label="Instalar aplicación"
            >
              {deferredPrompt ? '📱 Instalar App' : '💡 Cómo Instalar'}
            </button>
          )}
        </div>
      </div>

      <div className="pwa-features">
        <h4>✨ Características PWA Habilitadas:</h4>
        <ul>
          <li>📱 Instalable en dispositivos móviles y escritorio</li>
          <li>🔄 Funciona offline (Service Worker)</li>
          <li>🎨 Tema personalizado y splash screen</li>
          <li>🔔 Notificaciones (cuando se implementen)</li>
          <li>🌐 Experiencia similar a app nativa</li>
        </ul>
      </div>


    </div>
  );
};

export default PWAInfo;