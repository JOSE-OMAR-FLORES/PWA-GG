import { useState, useEffect } from 'react';
import { messaging, getToken, onMessage, VAPID_KEY } from '../config/firebase';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Verificar si el navegador soporta notificaciones
    const supported = 'Notification' in window && 'serviceWorker' in navigator && messaging !== null;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }
  }, []);

  // Solicitar permiso y obtener token
  const requestPermission = async () => {
    try {
      if (!isSupported) {
        throw new Error('Las notificaciones push no están soportadas en este navegador');
      }

      // Solicitar permiso de notificaciones
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === 'granted') {
        console.log('Permiso de notificación concedido');
        
        // Obtener el token de FCM
        const currentToken = await getToken(messaging, { 
          vapidKey: VAPID_KEY 
        });
        
        if (currentToken) {
          console.log('Token FCM:', currentToken);
          setToken(currentToken);
          
          // Guardar el token en localStorage para referencia
          localStorage.setItem('fcm-token', currentToken);
          
          return currentToken;
        } else {
          console.log('No se pudo obtener el token de registro');
          setError('No se pudo obtener el token de registro');
        }
      } else {
        console.log('Permiso de notificación denegado');
        setError('Permiso de notificación denegado');
      }
    } catch (err) {
      console.error('Error al solicitar permiso:', err);
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
  const sendTestNotification = () => {
    if (Notification.permission === 'granted') {
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
