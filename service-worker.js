const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "icons/mapa-jpg",
];

/* Instalacja Service Workera i cache'owanie plików */
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pwa-cache').then((cache) => {
            return cache.addAll([
                './index.html',
                './icons/mapa.jpg',

            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

/* Aktywacja i czyszczenie starego cache */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cache => cache !== CACHE_NAME).map(cache => caches.delete(cache))
            );
        })
    );
    self.clients.claim();
});
