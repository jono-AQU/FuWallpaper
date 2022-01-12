const cacheName = 'FuWallpaperPWA-v1';
const appShellFiles = [
  '/index.html',
  '/sw.js',
  '/styles.css',
  '/Wallpapers/1.jpg',
  '/manifest.json',
  '/72x72-11947-middle-finger-light-skin-tone-icon.png',
  '/512x512-11947-middle-finger-light-skin-tone-icon.png'
];
// concat additional stuff to contentToCache
const contentToCache = appShellFiles

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        console.log('[Service Worker] Caching all: app shell and content');
        await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});