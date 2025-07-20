const CACHE_NAME = "keydb-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  console.log("✅ Service Worker installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("✅ Caching app shell...");
      return cache.addAll(urlsToCache).catch(err => {
        console.error("❌ Cache error:", err);
      });
    })
  );
});

self.addEventListener("activate", event => {
  console.log("✅ Service Worker activating...");
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
