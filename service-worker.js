// Minimal service worker so the app installs as a standalone PWA and keeps
// working offline once it has been opened at least once.
const CACHE_NAME = 'mindful-moon-tracker-v64';
const ASSETS = [
    './Mindful-Moon-Tracker.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    './icons/icon-maskable-512.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) { return key !== CACHE_NAME; })
                    .map(function (key) { return caches.delete(key); })
            );
        })
    );
    self.clients.claim();
});

// Network-first: always try the newest files, fall back to the cache offline.
self.addEventListener('fetch', function (event) {
    if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) { return; }
    event.respondWith(
        fetch(event.request, { cache: 'no-cache' }).then(function (res) {
            var copy = res.clone();
            if (res.ok) { caches.open(CACHE_NAME).then(function (c) { c.put(event.request, copy); }); }
            return res;
        }).catch(function () {
            return caches.match(event.request, { ignoreSearch: true });
        })
    );
});