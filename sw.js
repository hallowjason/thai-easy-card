// Service Worker — 離線快取
const CACHE = 'thai-easy-card-v5';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/vocabulary.js',
  './js/srs.js',
  './js/tts.js',
  './js/notification.js',
  './js/app.js',
  'https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@400;600&family=Noto+Sans+TC:wght@400;600;700&display=swap',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // 僅快取同源資源；外部 API（Google TTS、Unsplash 等）直接放行
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
