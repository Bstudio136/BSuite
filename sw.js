// sw.js
self.addEventListener('install', (e) => {
  self.skipWaiting();
  console.log('Service Worker installé');
});

self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
  console.log('Service Worker activé');
});

self.addEventListener('fetch', (e) => {
  // Ce fichier intercepte les requêtes, mais on le laisse vide pour l'instant.
  // Sa simple présence est OBLIGATOIRE pour que Chrome propose l'installation.
});
