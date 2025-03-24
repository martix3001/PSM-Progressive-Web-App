const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "index.html",
    "manifest.json",
    "icons/icon-192.png",
    "icons/icon-512.png",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://unpkg.com/leaflet/dist/leaflet.js"
];

/* Instalacja Service Workera i cache'owanie plików */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
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

/* Obsługa zapytań sieciowych – zwracanie plików z cache */
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});
