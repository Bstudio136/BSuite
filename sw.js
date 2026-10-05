// sw.js - Service Worker minimal pour rendre la PWA installable
const CACHE_NAME = 'b-suite-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Handler fetch OBLIGATOIRE pour que Chrome accepte l'installation
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
