const CACHE_NAME = 'hcm-trip-v0.9.10';
const APP_SHELL = [
  './', './index.html', './style.css', './app-v0910.js', './manifest.json',
  './restaurants-v0910.js', './shopping-v0910.js',
  './trip-dashboard-hero-v094.png',
  './saigon-centre-v096.png', './vincom-mega-mall-v096.png', './crescent-mall-v096.png', './van-hanh-mall-v096.png',
  './massage-22spa-v097.png', './massage-ayla-v097.png', './massage-temple-leaf-v097.png', './massage-yuju-v097.png',
  './massage-miu-miu-v097.png', './massage-137-v097.png', './massage-dielo-v097.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const networkFirst = event.request.mode === 'navigate' || /\.(?:js|css|json)$/.test(url.pathname);
  if (networkFirst) {
    event.respondWith(fetch(event.request, {cache:'no-store'}).then(response => {
      if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
      return response;
    }).catch(() => caches.match(event.request).then(r => r || (event.request.mode === 'navigate' ? caches.match('./index.html') : undefined))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  })));
});
