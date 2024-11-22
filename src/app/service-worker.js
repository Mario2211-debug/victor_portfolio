const cacheName = 'v1';
const cacheAssets = [
    'index.js',
    'docs.js',
    'index.css',
    'docs.css',
    'vercel.svg',
    'next.svg',
    // '*.json',
];
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches
            .open(cacheName)
            .then((cache) => {
                console.log('caching files');
                return cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== cacheName) {
                        console.log('clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    );
});