// Service Worker — 離線快取
const CACHE = 'thai-easy-card-v11';
// 僅快取核心 JS/CSS/HTML，字體和音頻由網路提供（避免安裝失敗）
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/vocabulary.js',
  './js/phrases.js',
  './js/srs.js',
  './js/tts.js',
  './js/notification.js',
  './js/app.js',
  './js/phrases-app.js',
];

self.addEventListener('install', e => {
  // 用 allSettled：單一資源失敗不影響 SW 整體安裝
  e.waitUntil(
    caches.open(CACHE).then(c =>
      Promise.allSettled(ASSETS.map(url => c.add(url)))
    )
  );
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
