self.addEventListener('install', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
      .then(() => caches.open('v35'))
      .then(cache => {
        return cache.addAll([
          // Main page
          '/',
          // Images,
          '/images/air.png',
          '/images/player.png',
          '/images/playerTurnedLeft.png',
          '/images/redGround.png',
          '/images/pwaIcon.png',
          // Script that registers service worker
          '/registerServiceWorker.js',
          // P5
          '/p5.min.js',
          // Game scripts
          '/map.js',
          '/air.js',
          '/redGround.js',
          '/player.js',
          '/sketch.js',
          // Css
          '/style.css',
          // Web manifest
          '/app.webmanifest'
        ])
      })
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      // Real fetch if cache doesn't have it
      .then(async response => response || await fetch(e.request))
    )
})

self.addEventListener('message', e => {
  if (e.data === 'skipWaiting') {
    self.skipWaiting()
      .then(() => {
        self.clients.claim()
        return self.clients.matchAll()
      })
      .then(clients => {
        clients.forEach(client => {
          client.postMessage('reload')
        })
      })
  }
})