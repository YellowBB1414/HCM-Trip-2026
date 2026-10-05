const CACHE_NAME = 'hcm-trip-v0.9.8';
const APP_SHELL = [
  './',
  './index.html',
  './style.css',
  './app-v098.js',
  './manifest.json',
  './restaurants-v098.js',
  './shopping-v098.js',
  './trip-dashboard-hero-v094.png',
  './saigon-centre-v096.png',
  './vincom-mega-mall-v096.png',
  './crescent-mall-v096.png',
  './van-hanh-mall-v096.png',
  './massage-22spa-v097.png',
  './massage-ayla-v097.png',
  './massage-temple-leaf-v097.png',
  './massage-yuju-v097.png',
  './massage-miu-miu-v097.png',
  './massage-137-v097.png',
  './massage-dielo-v097.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument = event.request.mode === 'navigate';
  const isCoreData = /\/(app\.js|style\.css|restaurants\.js|shopping\.js|manifest\.json|trip-dashboard-hero-v094\.png)$/.test(url.pathname);

  if (isDocument || isCoreData) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request).then(r => r || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});
