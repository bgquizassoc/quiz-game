const CACHE_NAME = 'quiz-cache-v62';

const urlsToCache = [
  '/quiz-game/',                 // началната страница на Спокойната игра
  '/quiz-game/index.html',
  '/quiz-game/questions.json',
  '/quiz-game/manifest.json',
  '/quiz-game/icon-192.png',
  '/quiz-game/icon-512.png',
  '/quiz-game/music.mp3'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Кешира само файловете на Спокойната игра
  if (event.request.url.includes('/quiz-game/')) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
