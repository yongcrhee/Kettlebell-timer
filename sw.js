const CACHE_NAME = 'kb-timer-v8-jessica-kpop';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './audio/arm-circles-back.mp3',
  './audio/arm-circles-front.mp3',
  './audio/aura-farmer.mp3',
  './audio/body-waves.mp3',
  './audio/bouncing-twist.mp3',
  './audio/chiropractor.mp3',
  './audio/deep-squat-rotations.mp3',
  './audio/floor-press.mp3',
  './audio/floor-pullover.mp3',
  './audio/get-ready.mp3',
  './audio/go.mp3',
  './audio/goblet-squat.mp3',
  './audio/halo.mp3',
  './audio/high-kneeling-curl.mp3',
  './audio/high-kneeling-halo.mp3',
  './audio/high-kneeling-high-pull.mp3',
  './audio/high-kneeling-triceps-extension.mp3',
  './audio/hindu-squats.mp3',
  './audio/kettlebell-deadlift.mp3',
  './audio/kettlebell-swing.mp3',
  './audio/mcgregor.mp3',
  './audio/next-set.mp3',
  './audio/next.mp3',
  './audio/one-arm-row-left.mp3',
  './audio/one-arm-row-right.mp3',
  './audio/one.mp3',
  './audio/rest.mp3',
  './audio/russian-twist.mp3',
  './audio/side-bend.mp3',
  './audio/three.mp3',
  './audio/triceps-extension.mp3',
  './audio/two-arm-curl.mp3',
  './audio/two.mp3',
  './audio/workout-complete.mp3',
  './audio/yogi-lunge.mp3'
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
