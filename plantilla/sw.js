/* Service worker de la mini app: offline-first una vez cargada. */
const VERSION = 'miniapp-v1'
const NUCLEO = ['./', './index.html', './contenido.json', './marca.json', './manifest.webmanifest', './icono.svg']

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(NUCLEO)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

// Estrategia: cache primero, red de respaldo; lo que llega por red se guarda.
// Para navegaciones sin caché ni red, devolvemos index.html cacheado.
self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return
  e.respondWith(
    caches.match(request).then((enCache) => {
      const red = fetch(request)
        .then((resp) => {
          if (resp && resp.ok) {
            const copia = resp.clone()
            caches.open(VERSION).then((c) => c.put(request, copia))
          }
          return resp
        })
        .catch(() => enCache || (request.mode === 'navigate' ? caches.match('./index.html') : undefined))
      return enCache || red
    })
  )
})
