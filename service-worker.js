const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
    "index.html",
    "mapa.html",
    "sos.html",
    "manifest.json",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://unpkg.com/leaflet/dist/leaflet.js"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        return cache.addAll(filesToCache);
      })
    );
    self.skipWaiting();
  });
  
  /* Serve cached content when offline */
  self.addEventListener('fetch', function(e) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  });
