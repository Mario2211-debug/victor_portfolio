const CACHE_NAME = 'radio-images-cache-v1';

// Lista de tipos de arquivos a serem armazenados no cache
const FILE_TYPES_TO_CACHE = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];

self.addEventListener('fetch', (event) => {
    // Interceptar as requisições de imagens
    if (event.request.destination === 'image') {
        event.respondWith(
            caches.open(CACHE_NAME).then((cache) => {
                return cache.match(event.request).then((cachedResponse) => {
                    // Retorna do cache se disponível
                    if (cachedResponse) return cachedResponse;

                    // Caso contrário, faz a requisição e adiciona ao cache
                    return fetch(event.request).then((networkResponse) => {
                        // Verifica o tipo de arquivo antes de armazenar no cache
                        if (FILE_TYPES_TO_CACHE.includes(networkResponse.headers.get('content-type'))) {
                            cache.put(event.request, networkResponse.clone());
                        }
                        return networkResponse;
                    });
                });
            })
        );
    }
});

// Limpeza de caches antigos
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => cacheName !== CACHE_NAME)
                    .map((cacheName) => caches.delete(cacheName))
            );
        })
    );
});
