const CACHE_NAME = 'kb-timer-v9-jessica-root-audio';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './arm-circles-back.mp3',
  './arm-circles-front.mp3',
  './aura-farmer.mp3',
  './body-waves.mp3',
  './bouncing-twist.mp3',
  './chiropractor.mp3',
  './deep-squat-rotations.mp3',
  './floor-press.mp3',
  './floor-pullover.mp3',
  './get-ready.mp3',
  './go.mp3',
  './goblet-squat.mp3',
  './halo.mp3',
  './high-kneeling-curl.mp3',
  './high-kneeling-halo.mp3',
  './high-kneeling-high-pull.mp3',
  './high-kneeling-triceps-extension.mp3',
  './hindu-squats.mp3',
  './kettlebell-deadlift.mp3',
  './kettlebell-swing.mp3',
  './mcgregor.mp3',
  './next-set.mp3',
  './next.mp3',
  './one-arm-row-left.mp3',
  './one-arm-row-right.mp3',
  './one.mp3',
  './rest.mp3',
  './russian-twist.mp3',
  './side-bend.mp3',
  './three.mp3',
  './triceps-extension.mp3',
  './two-arm-curl.mp3',
  './two.mp3',
  './workout-complete.mp3',
  './yogi-lunge.mp3'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (
    url.hostname.includes('youtube.com') ||
    url.hostname.includes('googlevideo.com') ||
    url.hostname.includes('ytimg.com')
  ) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached =>
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached)
    )
  );
});
