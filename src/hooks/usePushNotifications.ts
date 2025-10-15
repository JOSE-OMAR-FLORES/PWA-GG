import { useState, useEffect } from 'react';
import { messaging, getToken, onMessage, VAPID_KEY } from '../config/firebase';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    const checkSupport = async () => {
      const hasNotification = 'Notification' in window;
      const hasServiceWorker = 'serviceWorker' in navigator;
      const hasMessaging = messaging !== null;
      
      console.log('Soporte de notificaciones:', {
        hasNotification,
        hasServiceWorker,
        hasMessaging,
        userAgent: navigator.userAgent
      });
      
      const supported = hasNotification && hasServiceWorker && hasMessaging;
      setIsSupported(supported);
      
      if (supported) {
        setPermission(Notification.permission);
        
        // Verificar si ya hay un SW registrado
        const registration = await navigator.serviceWorker.getRegistration();
        console.log('Service Worker registrado:', !!registration);
      }
    };
    
    checkSupport();
  }, []);

  // Solicitar permiso y obtener token
  const requestPermission = async () => {
    try {
      if (!isSupported) {
        throw new Error('Las notificaciones push no están soportadas en este navegador');
      }

      console.log('Iniciando solicitud de permiso...');
      
      // Verificar que el Service Worker esté registrado
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        throw new Error('Service Worker no está registrado. Recarga la página.');
      }
      
      console.log('Service Worker registrado:', registration.active?.state);

      // Solicitar permiso de notificaciones
      const permission = await Notification.requestPermission();
      console.log('Resultado del permiso:', permission);
      setPermission(permission);

      if (permission === 'granted') {
        console.log('✅ Permiso de notificación concedido');
        
        // Esperar un momento para asegurar que el SW esté activo
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Obtener el token de FCM
        console.log('Solicitando token FCM...');
        const currentToken = await getToken(messaging, { 
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration
        });
        
        if (currentToken) {
          console.log('✅ Token FCM obtenido:', currentToken.substring(0, 20) + '...');
          setToken(currentToken);
          
          // Guardar el token en localStorage
          localStorage.setItem('fcm-token', currentToken);
          
          // Mostrar notificación de bienvenida
          if ('showNotification' in registration) {
            registration.showNotification('¡Notificaciones Activadas! 🎉', {
              body: 'Ahora recibirás notificaciones de esta PWA',
              icon: '/icons/icon-192x192.png',
              badge: '/icons/icon-96x96.png',
              tag: 'welcome-notification'
            });
          }
          
          return currentToken;
        } else {
          console.log('❌ No se pudo obtener el token de registro');
          setError('No se pudo obtener el token de registro');
        }
      } else if (permission === 'denied') {
        console.log('❌ Permiso de notificación denegado');
        setError('Has bloqueado las notificaciones. Ve a configuración del navegador para permitirlas.');
      } else {
        console.log('⚠️ Permiso de notificación no concedido');
        setError('No se concedió el permiso de notificación');
      }
    } catch (err) {
      console.error('❌ Error al solicitar permiso:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  // Escuchar mensajes en primer plano
  useEffect(() => {
    if (!messaging) return;

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Mensaje recibido en primer plano:', payload);
      
      // Mostrar notificación cuando la app está en primer plano
      if (Notification.permission === 'granted') {
        const notificationTitle = payload.notification?.title || 'Nueva notificación';
        const notificationOptions: NotificationOptions = {
          body: payload.notification?.body || '',
          icon: payload.notification?.icon || '/icons/icon-192x192.png',
          badge: '/icons/icon-96x96.png',
          tag: 'foreground-notification',
          requireInteraction: false
        };

        new Notification(notificationTitle, notificationOptions);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Enviar notificación de prueba local
  const sendTestNotification = async () => {
    if (Notification.permission !== 'granted') {
      console.log('No hay permiso para enviar notificaciones');
      return;
    }
    
    try {
      // Intentar usar el Service Worker para mostrar la notificación (mejor para móviles)
      const registration = await navigator.serviceWorker.getRegistration();
      
      if (registration && 'showNotification' in registration) {
        console.log('Enviando notificación vía Service Worker...');
        await registration.showNotification('🎉 Notificación de Prueba', {
          body: 'Esta es una notificación de prueba desde tu PWA',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-96x96.png',
          tag: 'test-notification',
          requireInteraction: false,
          data: {
            url: '/',
            timestamp: Date.now()
          }
        });
      } else {
        // Fallback: usar la API de Notification directamente
        console.log('Enviando notificación vía Notification API...');
        const notification = new Notification('🎉 Notificación de Prueba', {
          body: 'Esta es una notificación de prueba desde tu PWA',
          icon: '/icons/icon-192x192.png',
          badge: '/icons/icon-96x96.png',
          tag: 'test-notification',
          requireInteraction: false,
          data: {
            url: '/',
            timestamp: Date.now()
          }
        } as NotificationOptions);

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
      
      console.log('✅ Notificación enviada');
    } catch (err) {
      console.error('❌ Error al enviar notificación:', err);
    }
  };

  return {
    permission,
    token,
    error,
    isSupported,
    requestPermission,
    sendTestNotification
  };
};
