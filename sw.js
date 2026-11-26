/* ============================================================
   B Suite : Service Worker
   Objectif : l'application complète (calculatrice + B Auth, B Gen Pass,
   B Keep Notes, B PGP, B Stegano) fonctionne sans aucune connexion.

   - Installation : tous les fichiers nécessaires sont téléchargés dans
     le cache (si l'un des fichiers REQUIS échoue, l'installation est
     annulée et sera retentée : pas de faux « prêt hors-ligne »).
   - Utilisation : le cache répond immédiatement ; si le réseau est
     disponible, le fichier est mis à jour en arrière-plan
     (stale-while-revalidate), donc une mise à jour d'index.html est
     prise en compte au lancement suivant.
   - Pour forcer une mise à jour complète : changer VERSION ci-dessous.
   ============================================================ */

const VERSION = 'bsuite-2026-11-26-1';
const CACHE = VERSION;
const SCOPE = self.registration.scope; // se termine toujours par « / »

const abs = (path) => new URL(path, SCOPE).href;

/* Fichiers indispensables au fonctionnement hors-ligne */
const REQUIRED = [
  './',
  'index.html',
  'vendor/otpauth.umd.min.js',
  'vendor/qrious.min.js',
  'vendor/crypto-js.min.js',
  'vendor/lucide.min.js',
  'vendor/font-orbitron.css',
  'vendor/font-jetbrains.css',
  'vendor/font-inter.css',
  'vendor/font-roboto.css'
];

/* Fichiers facultatifs (icônes, manifeste) : leur absence ne bloque pas l'installation */
const OPTIONAL = [
  'Sources/site.webmanifest',
  'Sources/icon-ios.png',
  'Sources/icon-android.png'
];

async function fetchFresh(url) {
  // cache: 'reload' contourne le cache HTTP pour ne jamais précacher une vieille version
  const res = await fetch(new Request(url, { cache: 'reload' }));
  if (!res.ok) throw new Error(url + ' → HTTP ' + res.status);
  return res;
}

/* Lit le manifeste et ajoute au cache toutes les icônes / start_url qu'il déclare */
async function cacheManifestAssets(cache) {
  try {
    const manifestUrl = abs('Sources/site.webmanifest');
    const res = await cache.match(manifestUrl);
    if (!res) return;
    const manifest = await res.clone().json();
    const urls = new Set();
    const add = (src) => {
      if (!src) return;
      try {
        const u = new URL(src, manifestUrl);
        if (u.origin === self.location.origin) urls.add(u.href);
      } catch (e) { /* URL invalide : ignorée */ }
    };
    (manifest.icons || []).forEach((i) => add(i.src));
    (manifest.screenshots || []).forEach((i) => add(i.src));
    (manifest.shortcuts || []).forEach((s) => (s.icons || []).forEach((i) => add(i.src)));
    add(manifest.start_url);
    await Promise.allSettled([...urls].map(async (u) => {
      if (await cache.match(u, { ignoreSearch: true })) return;
      const r = await fetchFresh(u);
      await cache.put(u, r);
    }));
  } catch (e) { /* manifeste absent ou illisible : sans conséquence */ }
}

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);

    // 1) Fichiers requis : tout ou rien
    await Promise.all(REQUIRED.map(async (path) => {
      const url = abs(path);
      const res = await fetchFresh(url);
      await cache.put(url, res);
    }));

    // 2) Fichiers facultatifs : au mieux
    await Promise.allSettled(OPTIONAL.map(async (path) => {
      const url = abs(path);
      const res = await fetchFresh(url);
      await cache.put(url, res);
    }));

    // 3) Icônes déclarées dans le manifeste
    await cacheManifestAssets(cache);

    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    // Supprime les anciennes versions du cache
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => k.startsWith('bsuite-') && k !== CACHE).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Les requêtes vers d'autres sites (HIBP, favicons, Google Maps) ne sont pas interceptées :
  // elles ne fonctionnent qu'en ligne et les apps gèrent déjà leur absence.
  if (url.origin !== self.location.origin) return;
  if (!url.href.startsWith(SCOPE)) return;

  event.respondWith(handleRequest(event, req));
});

async function handleRequest(event, req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req, { ignoreSearch: true, ignoreVary: true });

  const refresh = fetch(req)
    .then(async (res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        await cache.put(req, res.clone());
      }
      return res;
    })
    .catch(() => null);

  if (cached) {
    // Réponse immédiate depuis le cache, mise à jour en arrière-plan si le réseau répond
    event.waitUntil(refresh);
    return cached;
  }

  const fresh = await refresh;
  if (fresh) return fresh;

  // Hors-ligne et fichier inconnu : une navigation retombe sur l'application
  if (req.mode === 'navigate') {
    const fallback =
      (await cache.match(abs('index.html'), { ignoreVary: true })) ||
      (await cache.match(abs('./'), { ignoreVary: true }));
    if (fallback) return fallback;
  }
  return new Response('Hors ligne', {
    status: 503,
    statusText: 'Service Unavailable',
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
