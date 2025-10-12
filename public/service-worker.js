// ===============================
// 🚀 SERVICE WORKER ESTABLE PARA PWA
// ===============================
const VERSION = 'v1.0.0';
const CACHE_NAME = `pwa-cache-${VERSION}`;
const ASSETS = [
	'/',
	'/index.html',
	'/manifest.json',
	'/favicon.ico',
	// Agrega aquí tus archivos principales (ajusta según tu proyecto)
	'/offline.html',
	'/icons/icon-72x72.png',
	'/icons/icon-96x96.png',
	'/icons/icon-128x128.png',
	'/icons/icon-144x144.png',
	'/icons/icon-152x152.png',
	'/icons/icon-192x192.png',
	'/icons/icon-384x384.png',
	'/icons/icon-512x512.png'
];
// ===============================
// 📦 INSTALACIÓN
// ===============================
self.addEventListener('install', event => {
	console.log('[SW] Instalando service worker...');
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			console.log('[SW] Archivos cacheados');
			return cache.addAll(ASSETS);
		})
	);
	self.skipWaiting();
});

// ===============================
// 🧹 ACTIVACIÓN
self.addEventListener('activate', event => {
	console.log('[SW] Activando service worker...');
	event.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys.map(key => {
					if (key !== CACHE_NAME) {
						console.log('[SW] Borrando caché viejo:', key);
						return caches.delete(key);
					}
				})
			);
		})
	);
	self.clients.claim();
});

// ===============================
// 🌐 INTERCEPTAR SOLICITUDES
self.addEventListener('fetch', event => {
	if (event.request.method !== 'GET') return;

	event.respondWith(
		caches.match(event.request).then(cachedResponse => {
			if (cachedResponse) return cachedResponse;
			return fetch(event.request)
				.then(networkResponse => {
					return caches.open(CACHE_NAME).then(cache => {
						if (event.request.url.startsWith(self.location.origin)) {
							cache.put(event.request, networkResponse.clone());
						}
						return networkResponse;
					});
				})
				.catch(() => {
					if (event.request.destination === 'document') {
						return caches.match('/offline.html') || caches.match('/index.html');
					}
				});
		})
	);
});
// ===============================
// 🔔 MANEJO DE ACTUALIZACIONES MANUAL (opcional)
// ===============================
self.addEventListener('message', event => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});
