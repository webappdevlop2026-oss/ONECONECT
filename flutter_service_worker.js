self.addEventListener('install', (event) => { self.skipWaiting(); });
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((key) => caches.delete(key)));
    await self.registration.unregister();
    await self.clients.claim();
    const windows = await self.clients.matchAll({ type: 'window' });
    for (const windowClient of windows) {
      windowClient.navigate(windowClient.url);
    }
  })());
});
self.addEventListener('fetch', () => {});
