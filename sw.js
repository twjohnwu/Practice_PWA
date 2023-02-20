// Define cache APP name and file list
const CACHE_NAME = 'ZaWaRuDo-PWA';
const urlsToCache = [
  '/prj',
  '/prj/index.html',
  '/prj/manifest.json',
  '/prj/sw.js',
  '/prj/assets/style.css',
  '/prj/assets/fonts.css',
  '/prj/img/icon-144.png',
  '/prj/img/icon-192.png',
  '/prj/img/icon-512.png',
  '/prj/img/icon-1024.png',
  '/prj/favicon.ico'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  // console.log('installed');
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Add connect request, and return cache data
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
