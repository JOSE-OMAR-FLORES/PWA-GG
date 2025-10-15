// Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBKGqXjq0VgkaX6Y2qx5ObiuW6-pguGVc",
  authDomain: "pwa-jofm.firebaseapp.com",
  projectId: "pwa-jofm",
  storageBucket: "pwa-jofm.firebasestorage.app",
  messagingSenderId: "1057573351015",
  appId: "1:1057573351015:web:334f4d38c4304ded16eec2",
  measurementId: "G-YE27K9L85E"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification?.title || 'Nueva notificación';
  const notificationOptions = {
    body: payload.notification?.body || 'Tienes una nueva notificación',
    icon: payload.notification?.icon || '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [200, 100, 200],
    tag: 'notification-tag',
    requireInteraction: false,
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  
  event.notification.close();
  
  // Abrir la aplicación cuando se hace click en la notificación
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
